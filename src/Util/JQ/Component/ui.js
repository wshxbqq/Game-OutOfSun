/// <reference path="../JQ.js" />

$.ui = {};
$.ui.create = function (json) {
    var result = ccs.load(json).node;

    function loop(node){
        var childs=node.getChildren();
        for(var i=0;i<childs.length;i++){
            var cName=childs[i].getName();
            if(cName.indexOf('|')>-1){
                var l18nKey=cName.split('|')[1];
                if (childs[i].setString) {
                    childs[i].setString(Util.getText(l18nKey));
                } 
               
            } 
            loop(childs[i]);
             
        }
    
    }
    loop(result);

    return result;
}

$.ui.find = function () {
    var root;
    var selector;
    if (cc.isString(arguments[1])) {
        root = arguments[0];
        selector = arguments[1];
    } else {
        root = cc.director.getRunningScene();
        selector = arguments[0];
    }

    var result=[];

    function loop(node){
        var childs=node.getChildren();
        for(var i=0;i<childs.length;i++){
            if(childs[i].getName()===selector){
                result.push(childs[i]);
               
            } 
            loop(childs[i]);
             
        }
    
    }
    loop(root);
    return result;
}



jqCore.prototype.setString = function (str) {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (item.setString) {
            item.setString(str);
        } else {
            cc.log("Not Have Fun Named setString");
        }

    }
    return this;
}

jqCore.prototype.setSelect = function (isSelect) {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (item.setSelected) {
            item.setSelected(isSelect);
        } else {
            cc.log("Not Have Fun Named setSelected");
        }

    }
    return this;
}



jqCore.prototype.setStringWithL18nKey = function (keyStr) {
    this.setString(Util.getText(keyStr));
    return this;
}


jqCore.prototype.changeImg = function (str) {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (item.setTexture) {
            item.setTexture(str);
        } else {
            if (item.loadTexture) {
                item.loadTexture(str)
            } else {
                cc.log("Not Have Fun Named setTexture");
            }
        }

    }
    return this;
}


jqCore.prototype.bind = function (eventType, callBack) {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (item.addTouchEventListener) {
            switch (eventType) {
                case "touchstart": item.item_on_event_touchstart = callBack; break;
                case "touchmove": item.item_on_event_touchmove = callBack; break;
                case "touchend": item.item_on_event_touchend = callBack; break;
                case "touchcancel": item.item_on_event_touchcancel = callBack; break;
                case "select": item.item_on_event_ckb_select = callBack; break;
                case "unselect": item.item_on_event_ckb_unselect = callBack; break;
            }

            if (item.addEventListener) {
                item.addEventListener(function (sender, type) {

                    if (type == ccui.CheckBox.EVENT_SELECTED) {
                        item.item_on_event_ckb_select ? item.item_on_event_ckb_select() : null;
                    }
                    if (type == ccui.CheckBox.EVENT_UNSELECTED) {
                        item.item_on_event_ckb_unselect ? item.item_on_event_ckb_unselect() : null;
                    }
                });
            }
            if (item.addTouchEventListener) {
                item.addTouchEventListener(function (sender, type) {

                    if (type == ccui.Widget.TOUCH_BEGAN) {
                        item.item_on_event_touchstart ? item.item_on_event_touchstart() : null;
                    }
                    if (type == ccui.Widget.TOUCH_MOVED) {
                        item.item_on_event_touchmove ? item.item_on_event_touchmove() : null;
                    }
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        item.item_on_event_touchend ? item.item_on_event_touchend() : null;
                    }
                    if (type == ccui.Widget.TOUCH_CANCELED) {
                        item.item_on_event_touchcancel ? item.item_on_event_touchcancel() : null;
                    }

                })
            }
            

            


        } else {
            cc.log("Not Have Fun Named setString");
        }

    }
    return this;

};
