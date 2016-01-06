/// <reference path="../../Util/JQ/Component/device.js" />
/// <reference path="../../Util/JQ/Component/encrypt.js" />
/// <reference path="../../Util/JQ/Component/net.js" />
/// <reference path="../../Util/JQ/Component/sql.js" />
/// <reference path="../../Util/JQ/Component/ui.js" />
/// <reference path="../../Util/JQ/Component/util.js" />
/// <reference path="../../Util/JQ/Component/wx.js" />
/// <reference path="../../Util/JQ/JQ.js" />
/// <reference path="../../Util/underscore.js" />
/// <reference path="../../GLOBAL_DATA.js" />
/// <reference path="../../Util/util.js" />
/// <reference path="../../GLOBAL_DATA.js" />
 

var Layer_Prepare = {};

Layer_Prepare.init = function (node, parentLayer) {
    

 
    
    Layer_Prepare.layerNode = node;

    Layer_Prepare.parentLayer = parentLayer;
 
    var hand = $(node, "Image_Hand").items[0];
 
    var a0 = cc.delayTime(0.2);
    var a1 = cc.moveBy(0.5, cc.p(0, 200));
    var a2 = cc.fadeOut(0.3);
    var a3 = cc.delayTime(0.2);
    var a4 = cc.moveBy(0, cc.p(0, -200));
    var a5 = cc.fadeIn(0);

    var seq=cc.sequence(a0,a1,a2,a3,a4,a5);
    hand.runAction(cc.repeatForever(seq));
 
    

 
     

};
 

 