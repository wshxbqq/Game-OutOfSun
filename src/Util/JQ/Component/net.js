$.DC_SERVER = "http://dcrecord.sinaapp.com/dc/";
$.DC_SERVER_TEST = "http://dcrecord.sinaapp.com/dctest/";

$.net = {};

$.net.ajax = function (method, url, data, cb) {
    var _url = url;

    function obj2arg(d) {
        var result = [];
        for (var i in d) {
            result.push("&");
            result.push(encodeURIComponent(i));
            result.push("=");
            result.push(encodeURIComponent(d[i]));
        }
        return result.join('').substring(1);

    }

    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;
            if (cb) {
                cb(response);
            }

        }
    }


    if (method == "POST") {
        xhr.open(method, _url);
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(obj2arg(data));
    } else {
        if (_url.indexOf('?') > -1) {
            xhr.open(method, _url + "&" + obj2arg(data));
        } else {
            if (obj2arg(data) == "") {
                xhr.open(method, _url);
            } else {

                xhr.open(method, _url + "?" + obj2arg(data));
            }
        }

        xhr.send();
    }

}

$.net.get = function (url, data, cb) {
    var _date;
    var _cb;
    if (typeof (data) == "object") {
        _date = data;
        _cb = cb;
    }
    if (typeof (data) == "function") {
        _date = {}
        _cb = data;
    }
    $.net.ajax("GET", url, _date, _cb)
}

$.net.post = function (url, data, cb) {
    var _date;
    var _cb;
    if (typeof (data) == "object") {
        _date = data;
        _cb = cb;
    }
    if (typeof (data) == "function") {
        _date = {}
        _cb = data;
    }
    $.net.ajax("POST", url, _date, _cb)
}


$.net.dcRaw = function (deviceInfo, UUID, status, lang, region, autoStr, recordId, recordValue, misc, cb) {
    var dc_server = cc.game.config.debugMode == 0 ? $.DC_SERVER : $.DC_SERVER_TEST;
    $.net.get(dc_server, {
        di: deviceInfo ? deviceInfo : "unknow",
        uuid: UUID ? UUID : "unknow",
        status: status ? status : "unknow",
        lang: lang ? lang : "unknow",
        region: region ? region : "unknow",
        auto: autoStr ? autoStr : "unknow",
        rid: recordId ? recordId : "unknow",
        rv: recordValue ? recordValue : "unknow",
        misc: misc ? misc : "unknow",

    }, function (data) {
        cb(data);


    });
}

$.net.dcUserDefault = function (recordId, recordValue, misc, cb) {
    var deviceInfo = $.device.getDeviceTypeInfo();
    var uuid = cc.sys.localStorage.getItem("uuid");
    var userStatus = "";
    if (!cc.sys.isNative) {
        deviceInfo = "browser_" + cc.sys.browserType.toLowerCase();
        if (!uuid) {
            uuid = $.createUUID();
            cc.sys.localStorage.setItem("uuid", uuid);
        }
        userStatus = window.PF || $.util.getQueryString("pf") + "";
    }


    $.net.dcRaw(deviceInfo, uuid, userStatus, cc.sys.language, "", cc.sys.os, recordId, recordValue, misc, function () {

    });
}
