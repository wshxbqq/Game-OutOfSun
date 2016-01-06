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
 

var Layer_Cfg = {};

Layer_Cfg.init = function (node, parentLayer) {

 
    
    Layer_Cfg.layerNode = node;

    Layer_Cfg.parentLayer = parentLayer;

    Layer_Cfg.panelBg = $(node, "Panel_Color");

    Layer_Cfg.titleLabel = $(node, "Text_Title").setStringWithL18nKey("config");

    Layer_Cfg.backBtn = $(node, "Button_Back");

    Layer_Cfg.musicCkb = $(node, "CheckBox_Music");

    Layer_Cfg.soundCkb = $(node, "CheckBox_Sound");

    Layer_Cfg.musicLabel = $(node, "Text_Music_Label").setStringWithL18nKey("music");

    Layer_Cfg.soundLabel = $(node, "Text_Sound_Label").setStringWithL18nKey("sound");

    
    Layer_Cfg.musicCkb.bind("select", function () {
        GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
        Layer_Cfg.musicCkb.setSelect(!!GLOBAL_DATA.Music);
        Util.playEffic("res/Audio/button.mp3");
        if (!GLOBAL_DATA.Music) {
            Util.StopMusic();
        } else {
            if (!cc.audioEngine.isMusicPlaying()) {
                Util.playMusic("res/Audio/bg.mp3", 1);
            }
        }
        GLOBAL_DATA.save();
    });
    Layer_Cfg.musicCkb.bind("unselect", function (e) {
        GLOBAL_DATA.Music = !GLOBAL_DATA.Music;
        Layer_Cfg.musicCkb.setSelect(!!GLOBAL_DATA.Music);
        Util.playEffic("res/Audio/button.mp3");
        if (!GLOBAL_DATA.Music) {
            Util.StopMusic();
        } else {
            if (!cc.audioEngine.isMusicPlaying()) {
                Util.playMusic("res/Audio/bg.mp3", 1);
            }
        }
        GLOBAL_DATA.save();
      
    });

    Layer_Cfg.backBtn.bind("touchend", function (e) {
        GLOBAL_LAYER.showBtns();
        Util.playEffic("res/Audio/button.mp3");
        Layer_Cfg.layerNode.removeFromParent();
        if (GLOBAL_LAYER.isFlying) {
            GLOBAL_LAYER.scheduleUpdate();
           
        }
        GLOBAL_LAYER.isShowPause = 0;
        GLOBAL_LAYER.isInnerPlantMoving = 1;
        setTimeout(function () {
            GLOBAL_LAYER.gameReady = true;
        }, 100);
        
        
    });



    Layer_Cfg.soundCkb.bind("select", function () {
        GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
        Layer_Cfg.soundCkb.setSelect(!!GLOBAL_DATA.Sound);
        GLOBAL_DATA.save();
        Util.playEffic("res/Audio/button.mp3");

    });

    Layer_Cfg.soundCkb.bind("unselect", function () {
        GLOBAL_DATA.Sound = !GLOBAL_DATA.Sound;
        Layer_Cfg.soundCkb.setSelect(!!GLOBAL_DATA.Sound);
        GLOBAL_DATA.save();
        Util.playEffic("res/Audio/button.mp3");
    });



    Layer_Cfg.musicCkb.setSelect(!!GLOBAL_DATA.Music);
    Layer_Cfg.soundCkb.setSelect(!!GLOBAL_DATA.Sound);

};
 
 
 
 