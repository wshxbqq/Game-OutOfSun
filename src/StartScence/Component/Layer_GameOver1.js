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
 

var Layer_GameOver1 = {};

Layer_GameOver1.init = function (node, parentLayer) {

 
    
    Layer_GameOver1.layerNode = node;

    Layer_GameOver1.parentLayer = parentLayer;

    Layer_GameOver1.panelBg = $(node, "Panel_Color");

    //Layer_GameOver1.titleLabel = $(node, "Text_Title").setStringWithL18nKey("game_over");

    //Layer_GameOver1.scoreLabel = $(node, "Text_Score_Text").setStringWithL18nKey("score");

    Layer_GameOver1.scoreNum = $(node, "Text_Score").setString(GLOBAL_DATA.UserSocre+ "s");


    Layer_GameOver1.bestLabel = $(node, "Text_Best_Text").setStringWithL18nKey("best");

    Layer_GameOver1.bestNum = $(node, "Text_Best").setString(GLOBAL_DATA.UserBest+" s");



    Layer_GameOver1.backBtn = $(node, "Button_Back");

    Layer_GameOver1.rankBtn = $(node, "Button_Rank");

    Layer_GameOver1.shareBtn = $(node, "Button_Share");

    
    Layer_GameOver1.backBtn.bind("touchend", function () {
        Util.playEffic("res/Audio/button.mp3");
        GLOBAL_LAYER.reset();
        
    });

    Layer_GameOver1.rankBtn.bind("touchend", function () {
        $.device.gameCenter_ShowLeaderboard();

    });

    Layer_GameOver1.shareBtn.bind("touchend", function () {
        Util.openShare();

    });

 

     

};
 
 
 
 