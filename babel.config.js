const moduleResolver = require('babel-plugin-module-resolver');
module.exports = function (api) {
  const config = {
    "presets": ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
    "plugins": [
      ["@babel/plugin-proposal-decorators",
        { legacy: true }
      ],
      ["module-resolver",
        {
          "root": ["./src"],
          "extensions": [".ios.js", ".android.js", ".js", ".json", ".ts", ".tsx"],
          "alias": {
            "@component": "./src/component",
            "@const": "./src/const",
            "@domain": "./src/domain",
            "@interface": "./src/interface",
            "@image": "./src/image",
            "@nav": "./src/nav",
            "@screen": "./src/screen",
            "@state": "./src/state",
            "@styles": "./src/styles"
          },

          resolvePath(sourcePath, currentFile, opts) {
            // if the file is from node_modules don't do any aliasing!!!
            if (currentFile.indexOf('node_modules') >= 0) return sourcePath;

            return moduleResolver.resolvePath(sourcePath, currentFile, opts);
          }
        }
      ]
    ]
  }

  if (api.env("production")) {
    config.plugins.push("transform-remove-console")
  }

  return config;

} 
