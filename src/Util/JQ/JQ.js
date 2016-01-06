var jqCore = function () {
    this.selector;
    this.root;
    if (cc.isString(arguments[1])) {
        this.root = arguments[0];
        this.selector = arguments[1];
    } else {
        this.root = cc.director.getRunningScene();
        this.selector = arguments[0];
    }

    this.items = $.ui.find.apply(this, arguments);
};



var $ = function (root,selector ) {
    return new jqCore(root, selector);
};


$.log = function (obj) {
    console.log(JSON.stringify(obj));
}