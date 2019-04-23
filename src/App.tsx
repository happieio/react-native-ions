// @ts-ignore
import React from 'react';
import { RootNavigator } from '@nav/tabs';
import { Provider } from 'react-redux';
import { store } from '@state/index';
import { setTopLevelNavigator } from '@nav/util/nav-service';

//BRIDGE INSPECTOR
//import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';
//MessageQueue.spy(true);

export class App extends React.Component {
    // createAppContainer(RootNavigator);
    render() {
        return (
            <Provider store={store}>
                <RootNavigator ref={(navigatorRef: any) => setTopLevelNavigator(navigatorRef)} />
            </Provider>
        )
    }
}
