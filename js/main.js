$('.headerdiv').addClass('class_two');
$("form").attr("data-persist", "garlic");
// var btn = document.createElement("BUTTON");        // Create a <button> element
// var t = document.createTextNode("CLICK ME");       // Create a text node
// btn.appendChild(t);                                // Append the text to <button>
// document.body.appendChild(btn);                    // Append <button> to <body>

function validateLogin() {
    if (document.frmHTTPClientLogin.username.value.replace(/ /g, "") == "") {
        // sweetAlert("Please Enter Username");
        sweetAlert("Oops...", "Please Enter Username", "error");
        document.frmHTTPClientLogin.username.focus();
        return false
    }
    if (!validateUserNameForUTF8(document.frmHTTPClientLogin.username)) {
        return false
    }
    if (document.frmHTTPClientLogin.password.value == "") {
        sweetAlert("Oops...", "Please Enter password", "error");
        document.frmHTTPClientLogin.password.focus();
        return false
    }
    return true
}

// sweetAlert("Oops...", "Something went wrong!", "error");



function changeView(b) {
    var a = document.getElementById("msgDiv");
    if (message != null) {
        if (enablefullcustomization == true) {
            if (b == "CHALLENGE") {
                // a.innerHTML = "<font style='color: green;'>" + message + "</font>"
            sweetAlert("Hey you are in", "");
            } else {
                if (parseInt(ack) > 0) {
                    // a.innerHTML = "<font style='color: green;'>" + message + "</font>"
                sweetAlert("Login", "");
                } else {
                    // a.innerHTML = "<font  style='color: red;'>" + message + "</font>"
                sweetAlert("Logout", "");
                }
            }
        } else {
            if (b == "CHALLENGE") {
                // a.innerHTML = "<font class=note style='white-space: normal;margin:0px;font-family:tahoma,arial,san-serif;color:#565656;'>" + message + "</font>";
                // a.className = "msgdivForCHALLENGE"
                sweetAlert(message);
                // sweetAlert("3", "");
            } else {
                if (parseInt(ack) > 0) {
                    // a.innerHTML = "<font class=note><xmp style='white-space: normal;margin:0px;font-family:tahoma,arial,san-serif;' >" + message + "</xmp></font>";
                    // a.innerHTML = sweetAlert(message);
                    // a.className = "msgdiv"
                    // sweetAlert("Hello", "");

                    sweetAlert(message);
                } else {
                    // a.innerHTML = "<font class=errorfont><xmp style='white-space: normal;margin:0px;font-family:tahoma,arial,san-serif;' >" + message + "</xmp></font>";
                    // a.className = "msgdiv"
                    sweetAlert("Please Check your username password", "");
                }
            }
        }
    } else {
        a.innerHTML = "&nbsp;"
    }
    if (b == "CHALLENGE") {
        document.getElementById("usernamelbl").style.display = "none";
        document.getElementById("passwordlbl").style.display = "none";
        document.frmHTTPClientLogin.username.style.display = "none";
        document.getElementById("usernametxt").style.display = "none";
        document.frmHTTPClientLogin.password.value = "";
        document.frmHTTPClientLogin.btnSubmit.value = "Continue"
    } else {
        if (b == "LIVE") {
            document.getElementById("usernamelbl").style.visibility = "";
            document.getElementById("passwordlbl").style.visibility = "";
            document.frmHTTPClientLogin.username.style.visibility = "";
            if (document.getElementById("usernamelbl").style.display == "none") {
                document.getElementById("usernamelbl").style.display = ""
            }
            if (document.getElementById("passwordlbl").style.display == "none") {
                document.getElementById("passwordlbl").style.display = ""
            }
            if (document.getElementById("usernametxt").style.display == "none") {
                document.getElementById("usernametxt").style.display = ""
            }
            if (document.frmHTTPClientLogin.username.style.display == "none") {
                document.frmHTTPClientLogin.username.style.display = ""
            }
            document.frmHTTPClientLogin.username.readOnly = true;
            document.frmHTTPClientLogin.password.readOnly = true;
            document.frmHTTPClientLogin.btnSubmit.value = logoutValue;
            setTimeForLiveRequest(liveReqTimeInJS)
        } else {
            document.getElementById("usernamelbl").style.visibility = "";
            document.getElementById("passwordlbl").style.visibility = "";
            document.frmHTTPClientLogin.username.style.visibility = "";
            if (document.getElementById("usernamelbl").style.display == "none") {
                document.getElementById("usernamelbl").style.display = ""
            }
            if (document.getElementById("passwordlbl").style.display == "none") {
                document.getElementById("passwordlbl").style.display = ""
            }
            if (document.getElementById("usernametxt").style.display == "none") {
                document.getElementById("usernametxt").style.display = ""
            }
            if (document.frmHTTPClientLogin.username.style.display == "none") {
                document.frmHTTPClientLogin.username.style.display = ""
            }
            document.frmHTTPClientLogin.username.readOnly = false;
            document.frmHTTPClientLogin.password.readOnly = false;
            document.frmHTTPClientLogin.btnSubmit.value = loginValue
        }
    }
}