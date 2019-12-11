
//取得html表單輸入值
function postData() {
    window.username = document.getElementById("inputAccount").value;
    window.password = document.getElementById("inputPassword").value;
    //alert("你輸入的使用者帳號為：" + window.username + '\n' + "已輸入密碼：" + window.password);
    requestingData();
    //console.log("1111");
}

function requestingData() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/session";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            document.location.href = "https://recycle.likey.com.tw/home.html";
        } else {
            //alert("error");
            document.getElementById("warning").innerHTML = '*帳號或密碼錯誤，請重新輸入';
            console.log('error');
        }
    }
    var data = JSON.stringify({ platform: "web", username: window.username, password: window.password });
    xmlhttp.send(data);    
}

/*function encodeFormData(data) {
    if (!data) return ""; // Always return a string
    var pairs = []; // To hold name=value pairs
    for (var name in data) { // For each name
        if (!data.hasOwnProperty(name)) continue; // Skip inherited
        if (typeof data[name] === "function") continue; // Skip methods
        var value = data[name].toString(); // Value as string
        name = encodeURIComponent(name.replace(" ", "+")); // Encode name
        value = encodeURIComponent(value.replace(" ", "+")); // Encode value
        pairs.push(name + "=" + value); // Remember name=value pair
    }
    return pairs.join('&'); // Return joined pairs separated with &
}*/

/*$("#signin").submit(function(event) {
    var apiURL = "https://ceci.jj97181818.me/session";
    var username = document.getElementById("inputAccount").value;
    var password = document.getElementById("inputPassword").value;

    //document.getElementById("test").innerHTML = password;
    
    var sequenceRequest = new XMLHttpRequest();
    sequenceRequest.open('POST', apiURL,);
    sequenceRequest.responseType = 'json';
    sequenceRequest.send({platform: "web", username: username, password: password});

    var data = JSON.parse(this.response)



    var request = $.ajax({
        url: apiURL,
        method: "POST",
        data: { platform: "web", username: username, password: password },
        dataType: "json"
    });

    request.done(function() {
        var data = JSON.parse(this.responseText);
        document.getElementById("test").innerHTML = data;
    });

    request.fail(function(jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        document.getElementById("test").innerHTML = "Request failed: " + textStatus;
    });



    $.post(apiURL, 
        {
            platform: "web", 
            username: username, 
            password: password 
        },
        function(data, status) {
            alert("Data: " + data + "\nStatus: " + status);
            //console.log("success");
        });
});*/

