var orderData = document.getElementById("hisorder");
var routeData = document.getElementById("hisroute");
// var driverData = document.getElementById("driver");

function signout() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/session";
    xmlhttp.open("DELETE", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            document.location.href = "https://recycle.likey.com.tw";
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫訂單api
function requestingData_Order() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/orders?history=1";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.totalOrder = JSON.parse(xmlhttp.response);
            console.log('request_order');
            showOrder();
        } else {
            //alert("error");
            console.log('error');
        }

    }
    xmlhttp.send();
}

//同時呼叫路線和司機api
/*function requestingData_RouteandDriver() {
    requestingData_Route();
    requestingData_Driver();
    showRouteandDriver();
}*/

//呼叫司機api
function requestingData_Driver() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.totalDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            requestingData_Route();
        } else {
            //alert("error");
            console.log('error');
        }
    }
    xmlhttp.send();

}

//呼叫路線api
function requestingData_Route() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/routes";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.totalRoute = JSON.parse(xmlhttp.response);
            console.log('request_route');
            showRouteandDriver();
        } else {
            //alert("error");
            console.log('error');
        }
    }
}

function showOrder() {
    clearOrder();
    jsonOBJ = window.totalOrder;
    for (i = 0; i < jsonOBJ.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td'),
            td4 = document.createElement('td'),
            td5 = document.createElement('td'),
            td6 = document.createElement('td'),
            td7 = document.createElement('td'),
            td8 = document.createElement('td');
        var content1 = jsonOBJ[i].id,
            content2 = jsonOBJ[i].arrivalTime,
            content3 = jsonOBJ[i].name,
            content4 = jsonOBJ[i].address,
            content5 = jsonOBJ[i].cellphone,
            content6 = jsonOBJ[i].objectID,
            content7 = jsonOBJ[i].weight,
            content8 = jsonOBJ[i].profit;
        td1.innerHTML = content1;
        td2.innerHTML = content2;
        td3.innerHTML = content3;
        td4.innerHTML = content4;
        td5.innerHTML = content5;
        td6.innerHTML = content6;
        td7.innerHTML = content7;
        td8.innerHTML = content8;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        orderData.appendChild(tr);
    }
}

function showRouteandDriver() {
    clearRouteandDriver();
    jsonOBJ = window.totalRoute.routes;
    for (i = 0; i < jsonOBJ.length; i++) {
        if (jsonOBJ[i].finishedPercent == 100) {
            for (j = 0; j < jsonOBJ[i].orders.length; j++) {
                for (x of window.totalDriver) {
                    if (x.driverID == jsonOBJ.driverID) {
                        var tr = document.createElement('tr');
                        var td1 = document.createElement('td'),
                            td2 = document.createElement('td'),
                            td3 = document.createElement('td'),
                            td4 = document.createElement('td'),
                            td5 = document.createElement('td'),
                            td6 = document.createElement('td'),
                            td7 = document.createElement('td'),
                            td8 = document.createElement('td'),
                            td9 = document.createElement('td');
                        var content1 = jsonOBJ[i].routeID,
                            content2 = jsonOBJ[i].driverID,
                            content3 = jsonOBJ[i].date,
                            content4 = x.name,
                            content5 = x.licensePlate,
                            content6 = x.phone,
                            content7 = jsonOBJ[i].profit,
                            content8 = jsonOBJ[i].orders[j].orderID,
                            content9 = jsonOBJ[i].orders[j].orderAddress;
                        td1.innerHTML = content1;
                        td2.innerHTML = content2;
                        td3.innerHTML = content3;
                        td4.innerHTML = content4;
                        td5.innerHTML = content5;
                        td6.innerHTML = content6;
                        td7.innerHTML = content7;
                        td8.innerHTML = content8;
                        td9.innerHTML = content9;
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        tr.appendChild(td9);
                        routeData.appendChild(tr);
                    }

                }

            }

        }
    }
}

function clearOrder() {
    console.log("removing orders...");
    $('#hisorder').empty();
}

function clearRouteandDriver() {
    console.log("removing routes and drivers...");
    $('#hisroute').empty();
}