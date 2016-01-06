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
 
var Plant = cc.Sprite.extend({

    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    

    init: function () {
        this.innerPlant = null;
        this.speed = null;
    },
    //  name  dis  speed  plant_img
    initWithCfg: function (cfg) {
        var s = cc.Sprite.create();
        
        this.speed = cfg.speed;

        this.initWithFile("res/plant_bg.png");


        var txtName = ccui.Text.create(cfg.name, "", 35);
        txtName.setAnchorPoint(cc.p(0, 0.5));
        txtName.setColor(cc.color(0, 255, 255, 1));
        txtName.setPosition(40, 130);
        this.addChild(txtName);

        var txtDis = ccui.Text.create(cfg.dis, "", 35);
        txtDis.setAnchorPoint(cc.p(0, 0.5));
        txtDis.setColor(cc.color(0, 255, 255, 1));
        txtDis.setPosition(cc.p(40,50));
        this.addChild(txtDis);

        this.innerPlant = cc.Sprite.create("res/plant/" + cfg.plant_img + ".png");
        this.innerPlant.setPosition(cc.p(320, this.getContentSize().height / 2));
        this.addChild(this.innerPlant);


        this.scheduleUpdate();

    },
    update: function (dt) {
        if(!GLOBAL_LAYER.isInnerPlantMoving){
            return;
        }
        var x = this.innerPlant.getPositionX();
        var _x = x + this.speed;
        if (_x < 50 || _x > 600) {
            this.speed = -this.speed;
            _x = x + this.speed;
        }
        this.innerPlant.setPositionX(_x);

    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }

})