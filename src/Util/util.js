/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../GLOBAL_DATA.js" />
/// <reference path="JQ/JQ.js" />
/// <reference path="JQ/Component/device.js" />
/// <reference path="JQ/Component/net.js" />
/// <reference path="JQ/Component/sql.js" />
/// <reference path="JQ/Component/ui.js" />
/// <reference path="JQ/Component/util.js" />
/// <reference path="JQ/Component/wx.js" />



var Util = {};

Util.playMusic = function (src,isLoop) {
    if (GLOBAL_DATA.Music) {
       cc.audioEngine.playMusic(src, isLoop);
    }
}
Util.StopMusic = function () {
    cc.audioEngine.stopMusic();

}

Util.playEffic = function (src, loop) {
    if (GLOBAL_DATA.Sound) {
       return cc.audioEngine.playEffect(src, loop);
    }

}

Util.stopEffic = function (efficId) {

    cc.audioEngine.stopEffect(efficId);
}
 

Util.getText = function (key) {
    var lang = cc.sys.language;
    var result;
    var objL = LANG[key];
    if (!objL) {
        result = "no_text_for:" + key
    } else {
        if (objL[lang]!==undefined) {
            result = objL[lang];
        } else {
            result = objL["en"];
        }
    }
    return result;
}


 
//Util.openShare = function () {
//    if (cc.sys.isNative) {
//        if (cc.sys.language.toLowerCase() == "zh") {
//            $.device.openShare("分享文案", "res/logo_200.png", "https://itunes.apple.com/us/app/rock-paper-scissors-battle/id1014895272?l=zh&ls=1&mt=8");
//        } else {
//            $.device.openShare("share text", "res/logo_200.png", "https://itunes.apple.com/us/app/rock-paper-scissors-battle/id1014895272?l=us&ls=1&mt=8");
//        }
//    } else {
//        $.weixin.showMask();

//    }
//}

Util.getDistance = function (p1,p2) {
    var _x = p2.x - p1.x;
    var _y = p2.y - p1.y;

    return Math.sqrt(_x*_x+_y*_y);

}

Util.getArcTan2 = function (p1,p2) {
    return Math.atan2(p2.y-p1.y,p2.x-p1.x);

}

Util.arc2deg = function (arc) {
    return 180*arc/Math.PI
}

Util.clone=function(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}