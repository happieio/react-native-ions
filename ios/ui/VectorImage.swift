import UIKit

class VectorImage: UIView {
  //subview UIImageView to hold the imageRef
  var uiImageViewRef: UIImageView? = nil;
  
  //frame ref incase the UI is resized, the asset can maintain its size
  var imageCGRectRef: CGRect? = nil;
  
  override init(frame: CGRect) {
    super.init(frame: frame);
    //init references
    uiImageViewRef = UIImageView();
    uiImageViewRef?.frame = frame;
    imageCGRectRef = frame;
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc func reactSetFrame(frame: CGRect) {
    /* everytime content size changes, you will get its frame here. */
    super.reactSetFrame(frame)
    self.frame = frame;
    if(imageCGRectRef != nil) {
      uiImageViewRef?.frame = imageCGRectRef!;
    }
  }
  
  //RN prop native binding, pulls the asset and sets the UIImage and UIImageVIew frames
  //params array is an ordered string tuple
  @objc var params: [String] = [] {
    didSet {
      let name = params[0] //found in Imagesxcassets
      if let newImage = UIImage(named: name) {
        let width = params[1]
        let height = params[2]
        let tintColor = params[3]
        uiImageViewRef?.frame = CGRect(x: 0, y: 0, width: Int(width)!, height: Int(height)!)
        uiImageViewRef?.contentMode = UIView.ContentMode.scaleAspectFit
		    uiImageViewRef!.image = (tintColor.count > 0) ? newImage.withRenderingMode(.alwaysTemplate) : newImage;
        if(tintColor.count > 0) { uiImageViewRef!.tintColor = hexToUIColor(hex: tintColor)}
        self.addSubview(uiImageViewRef!)
        self.frame = CGRect(x: 0, y: 0, width: Int(width)!, height: Int(height)!)
      }
    }
  }
  
  private func hexToUIColor(hex: String) -> UIColor {
    let rgb = buildCGFloatRGB(hex: hex)
    return UIColor(red: rgb[0], green: rgb[1], blue: rgb[2], alpha: CGFloat(1))
  }
  
  private func buildCGFloatRGB(hex: String) -> [CGFloat] {
    let nHex = hex.replacingOccurrences(of: "#", with: "")
    return [hexToCGFloat(hexPart: nHex[0 ..< 2]), hexToCGFloat(hexPart: nHex[2 ..< 4]), hexToCGFloat(hexPart: nHex[4 ..< 6])]
  }
  
  private func hexToCGFloat(hexPart: String) -> CGFloat {
    if let hexInt = Int(hexPart, radix: 16) {
      return CGFloat(Float(hexInt) / 255.0)
    }
    else { return CGFloat(0); }
  }
}
