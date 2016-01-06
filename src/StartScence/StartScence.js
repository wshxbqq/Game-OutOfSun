/// <reference path="../Util/JQ/Component/device.js" />
/// <reference path="../Util/JQ/Component/encrypt.js" />
/// <reference path="../Util/JQ/Component/net.js" />
/// <reference path="../Util/JQ/Component/sql.js" />
/// <reference path="../Util/JQ/Component/ui.js" />
/// <reference path="../Util/JQ/Component/util.js" />
/// <reference path="../Util/JQ/Component/wx.js" />
/// <reference path="../Util/JQ/JQ.js" />
/// <reference path="../Util/underscore.js" />
/// <reference path="../Util/util.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="../L18n.js" />


var StartScence = cc.Scene.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    init: function () {
        var __id;
        var uuid = cc.sys.localStorage.getItem("uuid");
        if (cc.sys.isNative) {
            __id = "53";
            $.device.gameCenter_AuthenticateLocalUser();
        } else {
            __id = "53";
        }
        if (!uuid) {
            uuid = $.util.createUUID();
            cc.sys.localStorage.setItem("uuid", uuid);
            $.net.dcUserDefault(__id, 1, 1);
        }
        
        GLOBAL_DATA.load();
        if (GLOBAL_DATA.Music && !cc.audioEngine.isMusicPlaying()) {
            Util.playMusic("res/Audio/bg.mp3", 1);
        }


    },
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});


