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
 

var Layer_GameOver = {};

Layer_GameOver.init = function (node, parentLayer) {

 
    
    Layer_GameOver.layerNode = node;

    Layer_GameOver.parentLayer = parentLayer;

 


    Layer_GameOver.backBtn = $(node, "Button_Again");

    var a2 = cc.scaleTo(0.4, 1.1, 0.9);
    var a3 = cc.scaleTo(0.4, 0.9, 1.1);
    var a4 = cc.scaleTo(0.2, 1, 1);
    var a5 = cc.delayTime(0.5);

    var seq = cc.sequence(a2, a3, a4, a5);

 
    $(Layer_GameOver.layerNode, "Button_Again").items[0].runAction(cc.repeatForever(seq));
   
 

    
    Layer_GameOver.backBtn.bind("touchend", function () {
        Util.playEffic("res/Audio/button.mp3");
       
        
        GLOBAL_LAYER.reset();
        
    });

 

};
 
 
 
 