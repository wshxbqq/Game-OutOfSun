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
 

var Layer_Start = {};

Layer_Start.init = function (node, parentLayer) {

 
    
    Layer_Start.layerNode = node;

    Layer_Start.parentLayer = parentLayer;

    Layer_Start.panelBg = $(node, "Panel_Color");

    

    Layer_Start.startBtn = $(node, "Button_Start");
 

    
    Layer_Start.startBtn.bind("touchend", function () {
        Layer_Start.layerNode.removeFromParent();

        var preparePanel = GLOBAL_LAYER.preparePanel=  $.ui.create("res/Layer_Prepare.json");
        GLOBAL_LAYER.addChild(preparePanel);
        Layer_Prepare.init(preparePanel, GLOBAL_LAYER);
        Util.playEffic("res/Audio/button.mp3");
        window.setTimeout(function(){
            GLOBAL_LAYER.gameReady = true;
        },500);
 
        
    });

    

 
     

};
 
 
 
 