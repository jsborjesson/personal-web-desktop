JAWM.extend("util").AjaxCon = function (url, callback) {
    var READY_STATE_UNINITIALIZED = 0,
        READY_STATE_OPENED = 1,
        READY_STATE_SENT = 2,
        READY_STATE_LOADING = 3,
        READY_STATE_COMPLETE = 4;

    var xhr = this.getXHR();

    xhr.onreadystatechange = function(){
        
        if (xhr.readyState === READY_STATE_COMPLETE) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                callback(xhr.responseText);
            } else {
                if (console) console.log("Status: " + xhr.status);
            }
        }
    };

    xhr.open("get", url, true);
    xhr.send(null);
};

JAWM.util.AjaxCon.prototype.getXHR = function(){
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e1){
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            throw new Error("No XHR object available");
        }
    }
    return xhr;
};

