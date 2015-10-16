var loginstate = null;
var message = "";
var status = "";
var ack = "";
var userName = "";
userName = userName.replace(new RegExp("''", "g"), "'");
var password = "";
var timer = "";
var liveReqTimeInJS = 180;

function setHREF() {
    var b = document.URL;
    var g = "";
    if (enablefullcustomization == true) {
        var q = document.getElementById("__loginbox");
        var k = createElement({
            tag: "form",
            name: "frmHTTPClientLogin",
            target: "_parent",
            method: "post",
            onSubmit: "return checkSubmit();",
            action: "httpclient.html"
        }, q);
        var l = createElement({
            tag: "input",
            type: "hidden",
            name: "mode",
            value: "191"
        }, k);
        var m = createElement({
            tag: "div",
            id: "msgDiv"
        }, k);
        var n = createElement({
            tag: "div",
            id: "loginboxdiv"
        }, k);
        var a = createElement({
            tag: "label",
            id: "usernamelbl"
        }, n);
        a.appendChild(document.createTextNode(usernamecaption));
        var f = createElement({
            tag: "input",
            type: "text",
            name: "username",
            maxlength: "50",
            id: "usernametxt"
        }, n);
        var p = createElement({
            tag: "label",
            id: "passwordlbl"
        }, n);
        p.appendChild(document.createTextNode(passwordcaption));
        f = createElement({
            tag: "input",
            type: "password",
            autocomplete: "off",
            name: "password",
            maxlength: "50",
            id: "pwdfield"
        }, n);
        f = createElement({
            tag: "input",
            type: "submit",
            name: "btnSubmit",
            value: logincaption,
            id: "logincaption"
        }, n);
        var e = createElement({
            tag: "div",
            id: "linkdiv"
        }, k);
        var d = createElement({
            tag: "ul"
        }, e);
        var i = createElement({
            tag: "li",
            id: "accountAncLI"
        }, d);
        var j = createElement({
            tag: "a",
            href: "#",
            target: "_new",
            id: "accountAnc",
            title: myaccountcaption
        }, i);
        j.appendChild(document.createTextNode(myaccountcaption));
        var c = createElement({
            tag: "ul"
        }, e);
        var h = createElement({
            tag: "li",
            id: "registerLinkLI"
        }, c);
        var o = createElement({
            tag: "a",
            href: "#",
            target: "_new",
            title: registercaption,
            id: "registerLink"
        }, h);
        o.appendChild(document.createTextNode(registercaption))
    }
    if (b.split(":")[0] == "http") {
        document.getElementById("accountAnc").href = b.split("8090")[0] + port + "/corporate/webpages/login.jsp?webclient=myaccount";
        g = b.split("8090")[0] + "8090/corporate/webpages/guestportal/GuestUserEdit.jsp"
    } else {
        if (b.split(":")[0] == "https") {
            document.getElementById("accountAnc").href = b.split("8090")[0] + httpsport + "/corporate/webpages/login.jsp?webclient=myaccount";
            g = b.split("8090")[0] + "8090/corporate/webpages/guestportal/GuestUserEdit.jsp"
        }
    }
    if (guestUserEnabled == true) {
        document.getElementById("registerLinkLI").style.listStyle = "";
        document.getElementById("registerLink").style.display = "";
        document.getElementById("registerLink").onclick = function() {
            openRegisterWindow(g)
        }
    } else {
        document.getElementById("registerLinkLI").style.listStyle = "none";
        document.getElementById("registerLink").style.display = "none"
    }
    if (myAccountLink == true) {
        document.getElementById("accountAncLI").style.listStyle = "";
        document.getElementById("accountAnc").style.display = ""
    } else {
        document.getElementById("accountAncLI").style.listStyle = "none";
        document.getElementById("accountAnc").style.display = "none"
    }
}

function openRegisterWindow(c) {
    var a;
    var d;
    a = (window.screen.width - 750) / 2;
    d = (window.screen.height - 500) / 2;
    var b;
    if (typeof window.opener != "undefined" && navigator.userAgent.indexOf("MSIE") != -1) {
        b = window.opener.open(c, "reigisterLink", "status=yes, height=450,width=650,resizable=no,left=" + a + ",top=" + d + ",screenX=" + a + ",screenY=" + d + ",scrollbars=no")
    } else {
        b = window.open(c, "reigisterLink", "status=yes, height=450,width=650,resizable=no,left=" + a + ",top=" + d + ",screenX=" + a + ",screenY=" + d + ",scrollbars=no")
    }
    b.focus()
}
var producttype = "&producttype=0";
var regexHindi = "\u0900-\u097F";
var regexChinese = "\u4E00-\u9FFF";
var regexFrench = "\u00f9\u00fb\u00fc\u00ff\u00e0\u00e2\u00e7\u00e9\u00e8\u00ea\u00eb\u00ef\u00ee\u00f4\u0153\u00d9\u00db\u00dc\u0178\u00c0\u00c2\u00c7\u00c9\u00c8\u00ca\u00cb\u00cf\u00ce\u00d4\u0152";
var logoutMessage = "";
var isPopup = false;
window.onload = function() {
    try {
        if (window.opener) {
            status = window.opener.status;
            userName = window.opener.document.frmHTTPClientLogin.username.value;
            password = window.opener.document.frmHTTPClientLogin.password.value;
            message = window.opener.message;
            logoutMessage = window.opener.logoutMessage;
            ack = window.opener.ack;
            window.opener.focus();
            window.blur();
            if (typeof userName != "undefined") {
                document.frmHTTPClientLogin.username.value = userName
            }
            changeView(status);
            isPopup = true
        } else {
            if (getRequestParam(location.href, "ur") != null) {
                document.frmHTTPClientLogin.username.value = getRequestParam(location.href, "ur")
            }
            if (getRequestParam(location.href, "pw") != null) {
                document.frmHTTPClientLogin.password.value = getRequestParam(location.href, "pw")
            }
        }
        if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
            producttype = "&producttype=1";
            window.onbeforeunload = function() {}
        } else {
            if (navigator.userAgent.match(/android/i)) {
                producttype = "&producttype=2";
                window.onbeforeunload = function() {}
            }
        }
    } catch (a) {}
};

function validateDomainName(a) {
    var b = /^\w([\.]?\w|\-)*$/;
    var c = b.test(a);
    if (!c) {
        return false
    }
    return true
}

function validateUserNameForUTF8(b) {
    var c = /[\"\'\\]/;
    var a = b.value;
    var d = c.test(a);
    if (d) {
        return false
    }
    return true
}

function validateLogin() {
    if (document.frmHTTPClientLogin.username.value.replace(/ /g, "") == "") {
        alert("Please Enter Username");
        document.frmHTTPClientLogin.username.focus();
        return false
    }
    if (!validateUserNameForUTF8(document.frmHTTPClientLogin.username)) {
        return false
    }
    if (document.frmHTTPClientLogin.password.value == "") {
        alert("Please Enter Password");
        document.frmHTTPClientLogin.password.focus();
        return false
    }
    return true
}

function replaceAll(c, d, b) {
    var a = 0;
    while ((a = c.indexOf(d, a)) > -1) {
        c = c.substring(0, a) + b + c.substring(a + 1);
        a = a + b.length
    }
    return c
}

function makeAjaxRequest(e, d, a, c) {
    var b = getAjaxObject();
    b.open(e, a, true);
    b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    b.send(d);
    b.onreadystatechange = getReadyStateHandler(b, c);
    addOverlay()
}

function checkSubmit() {
    if (status != "LIVE") {
        document.frmHTTPClientLogin.mode.value = 191;
        if (validateLogin()) {
            UserValue = replaceAll(document.frmHTTPClientLogin.username.value, "'", "''");
            queryString = "mode=191&username=" + encodeURIComponent(UserValue) + "&password=" + encodeURIComponent(document.frmHTTPClientLogin.password.value) + "&a=" + (new Date).getTime() + producttype;
            if (loginstate != null) {
                queryString += "&state=" + loginstate
            }
            url = "login.xml";
            makeAjaxRequest("POST", queryString, url, loginResponse)
        }
    } else {
        if (document.forms[0].btnSubmit.value == logoutValue) {
            document.frmHTTPClientLogin.mode.value = 193;
            queryString = "mode=193&username=" + encodeURIComponent(document.frmHTTPClientLogin.username.value) + "&a=" + (new Date).getTime() + producttype;
            url = "logout.xml";
            makeAjaxRequest("POST", queryString, url, logoutResponse)
        }
    }
    return false
}
openWindow = null;

function loginResponse(g) {
    var d = g.documentElement;
    message = d.getElementsByTagName("message")[0].childNodes[0].nodeValue;
    ack = 1;
    status = d.getElementsByTagName("status")[0].childNodes[0].nodeValue;
    if (status == "CHALLENGE") {
        loginstate = d.getElementsByTagName("state")[0].childNodes[0].nodeValue;
        changeView(status);
        removeOverlay();
        return
    }
    loginstate = null;
    if (status == "LOGIN") {
        ack = -1
    }
    document.frmHTTPClientLogin.password.value = "";
    try {
        logoutMessage = d.getElementsByTagName("logoutmessage")[0].childNodes[0].nodeValue
    } catch (f) {}
    removeOverlay();
    if (status != "LOGIN") {
        if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && navigator.userAgent.match(/mozilla/i) && navigator.userAgent.match(/applewebkit/i) && navigator.userAgent.match(/mobile/i) && (!navigator.userAgent.match(/safari/i))) {
            location.href = "http://ios.cyberoam.com/app/s.html"
        }
        var b = "";
        if (location.href.indexOf("u=") != -1) {
            b = location.href.substring(location.href.indexOf("u=") + 2)
        }
        if (redirectTo != "") {
            if (redirectTo.indexOf("http") == -1) {
                redirectTo = "http://" + redirectTo
            }
            b = redirectTo
        }
        if (b != "" && !isPopup) {
            redirectURL = b;
            if (preserveCaptivePortal == "Y") {
                if (navigator.userAgent.toLowerCase().indexOf("chrome") == -1) {
                    changeView(status);
                    var c = document.createElement("a");
                    c.innerHTML = b;
                    c.href = b;
                    c.id = "redirectionanchor";
                    c.target = "_new";
                    c.style.textDecoration = "underline";
                    c.style.color = "#000000";
                    c.style.fontSize = "13px";
                    c.style.fontFamily = "Arial,sans-serif";
                    if (document.getElementById("redirecturl")) {
                        document.getElementById("redirecturl").appendChild(c)
                    }
                    if (navigator.userAgent.toLowerCase().indexOf("safari") != -1) {
                        var a = document.createEvent("MouseEvents");
                        a.initMouseEvent("click", true, true, window);
                        c.dispatchEvent(a)
                    }
                    c.click();
                    c.style.display = "none"
                } else {
                    var h = location.href;
                    if (location.href.indexOf("?") != -1) {
                        h = location.href.substring(0, location.href.indexOf("?"))
                    }
                    openWindow = window.open(h, null, "status=yes,height=600,width=700,resizable=no");
                    setTimeout(function() {
                        chromePopup(b)
                    }, 1000)
                }
            } else {
                location.href = redirectURL
            }
        } else {
            changeView(status)
        }
    } else {
        changeView(status)
    }
}

function chromePopup(a) {
    if (!openWindow || (openWindow && openWindow.outerWidth == 0)) {
        changeView(status);
        alert("To open the intended URL, disable the Pop-up blocker.")
    } else {
        document.body.innerHTML = "";
        window.onbeforeunload = null;
        window.focus();
        location.href = a
    }
}

function logoutResponse(b) {
    var a = b.documentElement;
    message = a.getElementsByTagName("message")[0].childNodes[0].nodeValue;
    ack = 1;
    status = a.getElementsByTagName("status")[0].childNodes[0].nodeValue;
    if (document.getElementById("redirecturl")) {
        document.getElementById("redirecturl").innerHTML = ""
    }
    changeView(status);
    clearTimeout(timer);
    removeOverlay()
}

function showMessage(a) {
    alert(a)
}

function sendLiveRequest() {
    url = "live?mode=192&username=" + encodeURIComponent(document.frmHTTPClientLogin.username.value) + "&a=" + (new Date).getTime() + producttype;
    invokeAjaxURL(url, "get")
}

function setTimeForLiveRequest(a) {
    clearTimeout(timer);
    if (a != -1) {
        timer = setTimeout("sendLiveRequest()", a * 1000)
    }
}

function parseXML(d) {
    if (d == null) {
        setTimeForLiveRequest(liveReqTimeInJS)
    } else {
        var b = d.documentElement;
        var a = "";
        try {
            a = b.getElementsByTagName("ack")[0].childNodes[0].nodeValue
        } catch (c) {}
        if (a != "") {
            var f = "";
            try {
                f = b.getElementsByTagName("livemessage")[0].childNodes[0].nodeValue
            } catch (c) {}
            if (a == "ack") {
                ack = 1;
                if (f != "") {
                    showMessage(f)
                }
                setTimeForLiveRequest(liveReqTimeInJS)
            } else {
                if (a == "nack") {
                    ack = -1;
                    message = f;
                    status = "LOGIN";
                    changeView(status)
                } else {
                    if (a == "login_again") {
                        message = f;
                        if (message == "") {
                            message = "Please login again."
                        }
                        ack = -1;
                        status = "LOGIN";
                        changeView(status)
                    } else {
                        if (a == "live_off") {}
                    }
                }
            }
        }
    }
}



function addOverlay() {
    document.frmHTTPClientLogin.btnSubmit.disabled = true;
    var a = document.createElement("div");
    a.id = "TB_secondoverlay";
    document.body.appendChild(a);
    document.getElementById("TB_secondoverlay").style.position = "absolute";
    document.getElementById("TB_secondoverlay").style.top = "0px";
    document.getElementById("TB_secondoverlay").style.width = document.body.clientWidth;
    document.getElementById("TB_secondoverlay").style.height = document.body.clientHeight;
    if (navigator.userAgent.indexOf("MSIE") == -1) {
        document.getElementById("TB_secondoverlay").style.background = "#000 url(/images/loading.gif) no-repeat center center";
        document.getElementById("TB_secondoverlay").style.opacity = 0.2
    } else {
        document.getElementById("TB_secondoverlay").style.background = "transparent url(/images/loading.gif) no-repeat center center"
    }
}

function removeOverlay() {
    if (document.getElementById("TB_secondoverlay")) {
        document.frmHTTPClientLogin.btnSubmit.disabled = false;
        document.body.removeChild(document.getElementById("TB_secondoverlay"))
    }
}

function getRequestParam(a, b) {
    if (a.indexOf(b + "=") != -1) {
        var c = a.indexOf(b + "=") + b.length + 1;
        if (a.indexOf("&", c) != -1) {
            return a.substring(c, a.indexOf("&", c))
        } else {
            return a.substring(c)
        }
    }
    return null
}
createElement = function(a, c) {
    var b = document.createElement(a.tag);
    if (typeof a.type != "undefined") {
        b.setAttribute("type", a.type)
    }
    if (typeof a.id != "undefined") {
        b.setAttribute("id", a.id)
    }
    if (typeof a.title != "undefined") {
        b.setAttribute("title", a.title)
    }
    if (typeof a.style != "undefined") {
        b.setAttribute("style", a.style)
    }
    if (typeof a.name != "undefined") {
        b.setAttribute("name", a.name)
    }
    if (typeof a.caption != "undefined") {
        b.setAttribute("caption", a.caption)
    }
    if (typeof a.className != "undefined") {
        if (navigator.userAgent.indexOf("MSIE 7.0") > -1) {
            b.className = a.className
        } else {
            b.setAttribute("class", a.className)
        }
    }
    if (typeof a.value != "undefined") {
        b.setAttribute("value", a.value)
    }
    if (typeof a.onClick != "undefined") {
        b.setAttribute("onClick", a.onClick)
    }
    if (typeof a.colspan != "undefined") {
        if (navigator.userAgent.indexOf("MSIE 7.0") > -1) {
            b.colSpan = a.colspan
        } else {
            b.setAttribute("COLSPAN", a.colspan)
        }
    }
    if (typeof a.target != "undefined") {
        b.setAttribute("target", a.target)
    }
    if (typeof a.method != "undefined") {
        b.setAttribute("method", a.method)
    }
    if (typeof a.onSubmit != "undefined") {
        b.setAttribute("onSubmit", a.onSubmit)
    }
    if (typeof a.action != "undefined") {
        b.setAttribute("action", a.action)
    }
    if (typeof a.href != "undefined") {
        b.setAttribute("href", a.href)
    }
    if (typeof c != "undefined") {
        c.appendChild(b)
    }
    return b
};