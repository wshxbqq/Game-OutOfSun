/// <reference path="../../cocos2d-js-v3.6.js" />
/// <reference path="../CfgPanel/CfgPanel.js" />
/// <reference path="../Util/JQ.js" />
/// <reference path="Component/Cell.js" />
/// <reference path="../Util/util.js" />
/// <reference path="Component/Ball.js" />
/// <reference path="../Util/underscore.js" />
/// <reference path="Component/Layer_GameStart.js" />
/// <reference path="Component/Plant.js" />
/// <reference path="Component/Hand.js" />
/// <reference path="Component/Enemy.js" />
 
 
var MainLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.init();
        return true;
    },
    reset: function () {
        
        GLOBAL_DATA.isFirst = 0;
 
        GLOBAL_DATA.PlantData = Util.clone(GLOBAL_DATA.PlantDataRaw);
       

        cc.director.runScene(new StartScence());
        
    
    },



    init: function () {
      


        var _this = this;
        GLOBAL_LAYER = this;
        this.Monster = null;
        this.gameReady = false;

        this.bgPlantArray =[];
        
  
        this.speed = GLOBAL_DATA.speed;

        this.isFlying = 0;

        this.direction = 1;

        this.touchStartTime = null;
        this.touchEndTime = null;
        this.touchStartPos = null;
        this.touchEndPos = null;

        this.tan = null;

        this.passedY = 0;

        this.totalTime = 0;

        this.isInnerPlantMoving = 1;

        this.isShowPause = 0;

        this.btnAdd = $("Button_Add_Speed").items[0];
        this.btnMinus = $("Button_Minus_Speed").items[0];

        this.speedAddEfficId = 0;
        this.speedLowEfficId = 0;
    
 

            var main = $.ui.create("res/Scene_Main.json");
            this.addChild(main);
            $(main, "Button_CFG").bind("touchend", function () {
                Util.playEffic("res/Audio/button.mp3");
                var cfgPanel = $.ui.create("res/Layer_Cfg.json");
                Layer_Cfg.init(cfgPanel, _this);
                _this.addChild(cfgPanel,50);
                _this.unscheduleUpdate();
                _this.gameReady = false;
                _this.isInnerPlantMoving = 0;
                _this.isShowPause = 1;
                $.net.dcUserDefault("56", 1, 1);
                _this.hideBtns(0);
            });
            this.startMain = main;

     
            $(main, "Button_Add_Speed").bind("touchstart", function () {
                _this.addSpeed();
            });
            $(main, "Button_Add_Speed").bind("touchend", function () {
                _this.normalSpeed();
            });

            $(main, "Button_Minus_Speed").bind("touchstart", function () {
                _this.minusSpeed();
            });
            $(main, "Button_Minus_Speed").bind("touchend", function () {
                _this.normalSpeed();
            });


        this.txtTime = $(main, "Text_Time").items[0];
        var WinSize = cc.director.getWinSize();
         
        if (GLOBAL_DATA.isFirst) {
           
            var cfgPanel = $.ui.create("res/Layer_Start.json");
            this.addChild(cfgPanel);
            Layer_Start.init(cfgPanel, this);
        } else {
            var preparePanel = GLOBAL_LAYER.preparePanel = $.ui.create("res/Layer_Prepare.json");
            GLOBAL_LAYER.addChild(preparePanel);
            Layer_Prepare.init(preparePanel, GLOBAL_LAYER);
            window.setTimeout(function () {
                GLOBAL_LAYER.gameReady = true;
            }, 500);
        }

        

        this.Monster = cc.Sprite.create("res/m_0.png");
        this.Monster.setPosition(cc.p(WinSize.width/2,-200));
        this.addChild(this.Monster, 10);

     


        var a1 = cc.moveTo(0.5, cc.p(WinSize.width / 2, 150));
        var cb1 = cc.callFunc(function () {
            setTimeout(function () {
                
                var _eventCfg = {};
                _eventCfg.event = cc.EventListener.TOUCH_ALL_AT_ONCE;
                if (_this.onTouchesBegan) { _eventCfg.onTouchesBegan = _this.onTouchesBegan; }
                if (_this.onTouchesMoved) { _eventCfg.onTouchesMoved = _this.onTouchesMoved; }
                if (_this.onTouchesEnded) { _eventCfg.onTouchesEnded = _this.onTouchesEnded; }
                cc.eventManager.addListener(cc.EventListener.create(_eventCfg), _this);

            }, 1000);
            
        });
        var seq1 = cc.sequence(a1,cb1);
        this.Monster.runAction(seq1);


        
 
 

        var pl = new Plant();
        pl.initWithCfg({ name: "小陨石", dis: "3100万 km", speed: 5, plant_img: "stone" });
        pl.setPosition(cc.p(320,2000));
        this.bgPlantArray.push(pl);

        this.addChild(pl);

        var p2 = new Plant();
        p2.initWithCfg({ name: "小陨石", dis: "4000万 km", speed: -5, plant_img: "stone" });
        p2.setPosition(cc.p(320, 1200));
        this.bgPlantArray.push(p2);

        this.addChild(p2);

        if (cc.sys.capabilities.opengl || !cc.sys.isMobile) {

            var _emitter1 = new cc.ParticleSystem("res/kilakila.plist");
            _emitter1.setPosition(cc.p(360, 560));
            _emitter1.retain();
            _this.addChild(_emitter1);
            _emitter1.texture = cc.textureCache.addImage("res/kilakila.png");
        }

        if (!cc.sys.isMobile && cc.sys.capabilities.opengl) {

            var _emitter = new cc.ParticleSystem("res/fire.plist");
            _emitter.setPosition(cc.p(360, -30));
            _emitter.retain();
            _this.addChild(_emitter);
            _emitter.texture = cc.textureCache.addImage("res/fire.png");


        }



       

 
 

    },

    addSpeed: function () {
        this.speed = GLOBAL_DATA.speed * 2;
        this.Monster.scaleX = 0.9;
        Util.stopEffic(this.speedAddEfficId);
        this.speedAddEfficId=Util.playEffic("res/Audio/dididi.mp3", 9999);
    },
    minusSpeed: function () {
        this.speed = 2.1;
        this.Monster.scaleX = 1.1;

        Util.stopEffic(this.speedLowEfficId);
        this.speedLowEfficId = Util.playEffic("res/Audio/slow.mp3");
    },

    normalSpeed: function () {
        this.speed = GLOBAL_DATA.speed;
        this.Monster.scaleX = 1;
        Util.stopEffic(this.speedAddEfficId);
        Util.stopEffic(this.speedLowEfficId);

    },

    showAngelWing: function (p) {
        ccs.armatureDataManager.addArmatureFileInfo("res/angel_wing/angel_wing.ExportJson");
        var armature = new ccs.Armature("angel_wing");
        window.arm = armature;
        armature.getAnimation().playWithIndex(0);
        armature.anchorX = 0.5;
        armature.anchorY = 0.5;
        armature.setPosition(p);

        this.addChild(armature);
    },


    update: function (dt) {
        var visableSize = cc.director.getWinSize();
        var _this = this;
        var p = _this.Monster.getPosition();

       

        var step_x = p.x + _this.speed * Math.cos(_this.tan) * _this.direction;
        var step_y = p.y + _this.speed * Math.sin(_this.tan);

        if (step_x < 50) {
            _this.direction = _this.direction * -1;
            step_x = p.x + _this.speed * Math.cos(_this.tan) * _this.direction;
            var rot = _this.Monster.getRotation();
            _this.Monster.setRotation(-rot);

            var _emitter = new cc.ParticleSystem("res/starl.plist");
            _emitter.setPosition(cc.p(30, 500));
            _emitter.retain();
            _this.addChild(_emitter,15);
            _emitter.texture = cc.textureCache.addImage("res/starl.png");
            Util.playEffic("res/Audio/rebound.mp3");
            
        }


        if(step_x > visableSize.width-50){
            _this.direction = _this.direction * -1;
            step_x = p.x + _this.speed * Math.cos(_this.tan) * _this.direction;
            var rot = _this.Monster.getRotation();
            _this.Monster.setRotation(-rot);
            var _emitter = new cc.ParticleSystem("res/starr.plist");
            _emitter.setPosition(cc.p(610, 500));
            _emitter.retain();
            _this.addChild(_emitter, 15);
            _emitter.texture = cc.textureCache.addImage("res/starr.png");
            Util.playEffic("res/Audio/rebound.mp3");

         }
        
        var layer_diff_y = step_y - GLOBAL_DATA.StandHeight;
        _this.passedY += _this.speed * Math.sin(_this.tan);
        if (layer_diff_y > 0) {
  
            _this.dropDownBgPlantArray(_this.speed * Math.sin(_this.tan));
           
            _this.Monster.setPosition(cc.p(step_x, p.y));
        } else {
            _this.Monster.setPosition(cc.p(step_x, step_y));
        }
        if (GLOBAL_DATA.PlantData[0]) {
            if (_this.passedY > GLOBAL_DATA.PlantData[0].wshow) {
                var pd = GLOBAL_DATA.PlantData.shift();
                var p2 = new Plant();
                p2.initWithCfg(pd);
                p2.setPosition(cc.p(320, 1400));
                _this.bgPlantArray.push(p2);
                _this.addChild(p2);

                if (GLOBAL_DATA.PlantData.length==0) {
                    _this.lastPlant = p2;
                }

            }
        }

        if (_this.lastPlant && _this.Monster.getPositionY() > _this.lastPlant.getPositionY()+200) {
            _this.unscheduleUpdate();
            _this.showGameOverPanel(1);
            

        }
    
        var _CollisionResult=_this.checkCollision();
        if (_CollisionResult) {
            _this.unscheduleUpdate();
            clearInterval(_this.__interval);

 
            
            var x=(_CollisionResult.x+_this.Monster.x)/2;
            var y=(_CollisionResult.y+_this.Monster.y)/2;
            var midP = cc.p(x, y);
            _this.showAngelWing(midP);

            _this.Monster.setVisible(0);

            var boom = cc.Sprite.create("res/boom.png");
            boom.setPosition(midP);
            _this.addChild(boom);

            var a1 = cc.scaleTo(0.3,1.2,1.2);
            var a2 = cc.scaleTo(0.3, 1, 1);
            var seq = cc.sequence(a1, a2);
            boom.runAction(seq);

            setTimeout(function () {
                Util.playEffic("res/Audio/haliluya.mp3");
                setTimeout(function () {
                    _this.showGameOverPanel();
                }, 1000);
            }, 500);
 

        }

      
    },
    checkCollision: function () {
        var _this = this;
        var result = 0;
        _.each(_this.bgPlantArray, function (i, n) {
            var plant = i;
            var p = plant.convertToWorldSpace(plant.innerPlant.getPosition());
            var distance = cc.pDistance(_this.Monster.getPosition(),p);
            if (distance < 85) {
                result = p;
                Util.playEffic("res/Audio/bomb_explode.mp3");
 
            }

        });

        return result;

    },

    showGameOverPanel: function (isWin) {
        var _this = this;
        _this.isInnerPlantMoving = 0;
        clearInterval(_this.__interval);
        _this.hideBtns(0);
        _this.normalSpeed();
        if (isWin) {
            $.net.dcUserDefault("55", _this.totalTime, 1);
            Util.playEffic("res/Audio/success.mp3");
            if (GLOBAL_DATA.UserBest > _this.totalTime) {
                GLOBAL_DATA.UserBest = _this.totalTime;
            }
            var gameOverPanel1 = $.ui.create("res/Layer_GameOver.json");
            Layer_GameOver1.init(gameOverPanel1, _this);
            _this.addChild(gameOverPanel1,50);
         
            $(gameOverPanel1, "Text_Score").items[0].setString(_this.totalTime+" s");
   
            $(gameOverPanel1, "Text_Best").items[0].setString(GLOBAL_DATA.UserBest+" s");
            GLOBAL_DATA.save();
        } else {
            $.net.dcUserDefault("54", _this.totalTime, 1);
            var gameOverPanel = $.ui.create("res/Layer_gover.json");
            Layer_GameOver.init(gameOverPanel, _this);
            _this.addChild(gameOverPanel, 50);
            $(gameOverPanel, "Text_Percent").setString(((_this.passedY/20000)*100).toFixed(0));
        }

    },
    
    onTouchesBegan: function (touches, event) {
 
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();

        if (target.isFlying) {
            if (location.x < 320) {
                target.addSpeed();
            } else {
                target.minusSpeed();
            }
 
        } else {
            target.touchStartPos = location;
            target.touchStartTime = new Date();
        }
        //event.stopPropagation();
  
        return false
    },
    onTouchesMoved: function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();
        target.touchEndPos = location;
    
        //event.stopPropagation();
    },
    onTouchesEnded: function (touches, event) {
 
        
        var touch = touches[0];
        var location = touch.getLocation();
        var target = event.getCurrentTarget();
 
        if (!target.gameReady) {
            return;
 
        }
        if (target.isFlying) {
            target.normalSpeed();
            return;
        }
        target.touchEndTime = new Date();
        var tsp = target.touchStartPos;
        if (!target.touchStartPos) {
            tsp = location;
        }
        var timeSpan = target.touchEndTime - target.touchStartTime;
        var dis = Util.getDistance(tsp, location);
 
        if (dis / timeSpan > 1 && location.y > target.touchStartPos.y) {
            if (!target.isFlying) {
                Util.playEffic("res/Audio/launch.mp3");
                target.tan = Util.getArcTan2(target.touchStartPos, location);
                GLOBAL_LAYER.preparePanel.setVisible(0);

                var deg = Util.arc2deg(target.tan);
                target.Monster.setRotation(90 - deg);

                target.scheduleUpdate();

                target.isFlying = 1;

                target.showBtns();


                target.__interval = setInterval(function () {
                    if (target.isShowPause) {
                        return;
                    }
                    target.totalTime++;
                    target.txtTime.setString(target.totalTime + " 's");
                }, 100);
            }
            


        } else {
            if (dis / timeSpan < 1 && dis / timeSpan > 0.5 && location.y > target.touchStartPos.y) {
                if (!target.isFlying) {
                    target.showPowerNotEnoughLabel();
                }
                
            }
            
        }
       
        //event.stopPropagation();
    },

    dropDownBgPlantArray: function (y) {
        var _this=this;
        _.each(_this.bgPlantArray, function (i, n) {
            i.setPositionY(i.getPositionY()-y);
        });


        var garbage = null;
        for (var i = 0; i < _this.bgPlantArray.length; i++) {
            var plant = _this.bgPlantArray[i];
            if (plant.getPositionY() < -400) {
                garbage = plant;
                break;
            }
        }
        if (garbage) {
            garbage.removeFromParent();
            _this.bgPlantArray = _.without(_this.bgPlantArray, garbage);
        }
        

    },

    showPowerNotEnoughLabel: function () {
        var txt = ccui.Text.create("冲击力不足","",40);
        var visableSize = cc.director.getWinSize();
        txt.setColor(cc.color(255,255,255,1));
        txt.setPosition(visableSize.width / 2,700);

        this.addChild(txt);

        var a1 = cc.scaleTo(0.3, 1.5, 1.5);
        var a2 = cc.scaleTo(0.3, 1, 1);
        var a3 = cc.fadeOut(0.5);
        var cb = cc.callFunc(function (node) {
            node.removeFromParent();
        });
        var seq = cc.sequence(a1, a2, a3, cb);

        txt.runAction(seq);

    },
    showBtns: function () {
        var btnAdd = $("Button_Add_Speed").items[0];
        var btnMinus = $("Button_Minus_Speed").items[0];

        btnAdd.setOpacity(0);
        btnMinus.setOpacity(0);
      
        btnAdd.setVisible(1);
        btnMinus.setVisible(1);

        var a1 = cc.fadeIn(0.3);
        btnAdd.runAction(a1.clone());
        btnMinus.runAction(a1.clone());
    },
    hideBtns: function (t) {
 
        var btnAdd = $("Button_Add_Speed").items[0];
        var btnMinus = $("Button_Minus_Speed").items[0];

        var a1 = cc.fadeOut(t);
        btnAdd.runAction(a1);
        btnMinus.runAction(a1.clone());

    },

    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }

});