var GLOBAL_DATA = {};


var GLOBAL_LAYER=null;

GLOBAL_DATA.Music = true;
GLOBAL_DATA.Sound = true;

GLOBAL_DATA.UserSocre = 0;
GLOBAL_DATA.UserBest = 999999;

GLOBAL_DATA.StandHeight = 500;

GLOBAL_DATA.save = function () {

    cc.sys.localStorage.setItem("UserBest", GLOBAL_DATA.UserBest + "");
 
    cc.sys.localStorage.setItem("Music", GLOBAL_DATA.Music+"");

    cc.sys.localStorage.setItem("Sound", GLOBAL_DATA.Sound + "");

}
GLOBAL_DATA.isFirst = 1;
GLOBAL_DATA.speed = 8;
GLOBAL_DATA.load = function () {
    var userBest = cc.sys.localStorage.getItem("UserBest");
    GLOBAL_DATA.UserBest = userBest ? parseInt(userBest) : GLOBAL_DATA.UserBest;
    GLOBAL_DATA.UserBest = parseInt(GLOBAL_DATA.UserBest);

  
 
    
    GLOBAL_DATA.Music = cc.sys.localStorage.getItem("Music") == "false" ? false : true;
    GLOBAL_DATA.Sound = cc.sys.localStorage.getItem("Sound") == "false" ? false : true;
 
}



GLOBAL_DATA.PlantDataRaw = [
{ name: "水星", dis: "5800万 km", speed: 5, plant_img: "0", wshow: 2000 },
{ name: "金星", dis: "1亿 km", speed: -6, plant_img: "1", wshow: 3200 },
{ name: "地球 ", dis: "1.5亿 km", speed: 7, plant_img: "2", wshow: 4300 },
{ name: "月球 ", dis: "1.5亿 km", speed: -8, plant_img: "3", wshow: 5300 },

{ name: "火星", dis: "2.2亿 km", speed: 9, plant_img: "4", wshow: 6300 },
{ name: "木星 ", dis: "7.8亿 km", speed: -9, plant_img: "5", wshow: 7200 },
{ name: "艾奥（木卫一） ", dis: "7.8亿 km", speed: 10, plant_img: "6", wshow: 8200 },
{ name: "欧罗巴（木卫二） ", dis: "7.8亿 km", speed: 10, plant_img: "7", wshow: 9300 },
{ name: "加尼未（木卫三） ", dis: "7.8亿 km", speed: -10, plant_img: "8", wshow: 10400 },


{ name: "土星", dis: "14亿 km", speed: 11, plant_img: "9", wshow: 11200 },
{ name: "美马斯（土卫一）", dis: "14亿 km", speed: 11, plant_img: "10", wshow: 12300 },
{ name: "恩克拉多斯（土卫二）", dis: "14亿 km", speed: 12, plant_img: "11", wshow: 13400 },
{ name: "泰坦（土卫三）", dis: "14亿 km", speed: -15, plant_img: "12", wshow: 14100 },



{ name: "天王星", dis: "28亿 km", speed: 16, plant_img: "13", wshow: 15100 },
{ name: "海王星", dis: "45亿 km", speed: -16, plant_img: "14", wshow: 16200 },
{ name: "冥王星------终点线", dis: "59亿 km", speed: 16, plant_img: "15", wshow: 17200 }

];

 
clone = function (obj) {
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



GLOBAL_DATA.PlantData = clone(GLOBAL_DATA.PlantDataRaw);
