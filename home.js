//車輛管理：totalDriver
//訂單管理：totalOrder
//路線管理：totalRoute

//左右兩欄
var orderData = document.getElementById("home");
var routeData = document.getElementById("profile");
var driverData = document.getElementById("driver");
var i, j, totalOrder, totalDriver, totalRoute;

function signout() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/session";
    xmlhttp.open("DELETE", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            document.location.href = "https://recycle.likey.com.tw";
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫訂單api (訂單管理用) -> showOrder
function requestingData_Order() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/orders?history=0";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.totalOrder = JSON.parse(xmlhttp.response);
            console.log('request_order');
            showOrder(window.totalOrder);
        } else {
            //alert("error");
            console.log('error');
        }

    }
    xmlhttp.send();
}

//呼叫訂單api (顯示全訂單用) -> addTotalOrder
function requestingData_Order_showall() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/orders?history=0";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        //alert(xmlhttp.status);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.totalOrder = JSON.parse(xmlhttp.response);
            console.log('request_order');
            addTotalOrder(window.totalOrder);
        } else {
            //alert("error");
            console.log('error');
        }

    }
    xmlhttp.send();
}

//呼叫司機api (車輛管理用) -> showDriver
function requestingData_Driver() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            window.totalDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            showDriver(window.totalDriver);
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫司機api (顯示全司機用) -> addTotalDriver
function requestingData_Driver_showall() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            window.totalDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            addTotalDriver(window.totalDriver);
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫司機api (路線管理顯示司機用) -> addDriverPoint_route
function requestingData_Driver_route(index) {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers/" + index;
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            window.specificDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            addDriverPoint_route(window.specificDriver);
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫司機api (顯示全路線用) -> addTotalDriver_route
function requestingData_Driver_showall_route() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            window.totalDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            addTotalDriver_route(window.totalDriver);
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫司機api (顯示對應司機用) -> highlightDriverfromRoute
function requestingData_Driver_highlight(index) {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/drivers";
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            window.totalDriver = JSON.parse(xmlhttp.response);
            console.log('request_driver');
            highlightDriverfromRoute(window.totalDriver, index);
        } else {
            console.log('error');
        }
    }
    xmlhttp.send();
}

//呼叫路線api (顯示路線管理用) -> showRoute
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
            showRoute(window.totalRoute.routes);
        } else {
            //alert("error");
            console.log('error');
        }
    }
}

//呼叫單一路線api (顯示路線在地圖上用) -> sequenceToRouting
function requestingData_specificRoute(index) {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    var theUrl = "https://recycle.likey.com.tw/api/routes/" + index;
    xmlhttp.open("GET", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            //alert("login success");
            window.specificRoute = JSON.parse(xmlhttp.response);
            console.log('request_specificRoute');
            sequenceToRouting(window.specificRoute.route);
            // showRoute(window.totalRoute.routes);
        } else {
            //alert("error");
            console.log('error');
        }
    }
}

//呼叫路線api (顯示全路線用) -> sequencesToRouting
function requestingData_Route_showall() {
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
            sequencesToRouting(window.totalRoute.routes);
            // showRoute(window.totalRoute.routes);
        } else {
            //alert("error");
            console.log('error');
        }
    }
}

//呼叫路線api (搜尋司機ID用) -> findDriverIDfromOrder
function requestindData_Route_searchDriverID(index) {
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
            findDriverIDfromOrder(window.totalRoute.routes, index);
            // showRoute(window.totalRoute.routes);
        } else {
            //alert("error");
            console.log('error');
        }
    }
}

//顯示訂單總覽 -> requestindData_Route_searchDriverID, addOrderPoint, showTotalOrder
function showOrder(jsonOBJ) {
    clearTotalOrder();
    clearInterval(window.interval);
    for (i = 0; i < jsonOBJ.length; i++) {
        var ol = document.createElement('ol');
        ol.setAttribute('class', 'nav-sidebar');

        var id = jsonOBJ[i].id;
        ol.setAttribute('id', id);
        ol.setAttribute('onclick', 'addOrderPoint(id)');

        var li1 = document.createElement('li'),
            li2 = document.createElement('li'),
            //li3 = document.createElement('li'),
            li4 = document.createElement('li'),
            li5 = document.createElement('li'),
            btn = document.createElement('button');
        var content1 = '訂單ID：' + jsonOBJ[i].id,
            content2 = '使用者：' + jsonOBJ[i].name,
            //content3 = '日期：' + jsonOBJ[i].datetime,
            content4;
        if (jsonOBJ[i].status == 1) {
            content4 = '訂單狀態：未交接';
        } else if (jsonOBJ[i].status == 2) {
            content4 = '訂單狀態：已交接';
        }
        li1.innerHTML = content1;
        li2.innerHTML = content2;
        //li3.innerHTML = content3;
        li4.innerHTML = content4;
        btn.setAttribute('type', 'button');
        btn.innerHTML = '詳細';
        btn.setAttribute('class', 'btn btn-default');
        btn.setAttribute('data-toggle', 'collapse');
        var datatarget = '#collapse-order' + jsonOBJ[i].id;
        btn.setAttribute('data-target', datatarget);
        btn.setAttribute('style', 'color: black');
        btn.setAttribute('aria-expanded', 'false');
        var ariacontrols = 'collapse-order' + jsonOBJ[i].id;
        btn.setAttribute('aria-controls', ariacontrols);
        var onclick = 'requestindData_Route_searchDriverID(' + jsonOBJ[i].id + ')';
        btn.setAttribute('onclick', onclick);

        li5.appendChild(btn);
        ol.appendChild(li1);
        ol.appendChild(li2);
        //ol.appendChild(li3);
        ol.appendChild(li4);
        ol.appendChild(li5);
        orderData.appendChild(ol);
        showTotalOrder(jsonOBJ, i);
    }
}

//顯示訂單詳細資料
function showTotalOrder(jsonOBJ, i) {
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'collapse');
    var id = 'collapse-order' + jsonOBJ[i].id;
    div1.setAttribute('id', id);
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'card card-body');
    var content;
    content = '訂單ID：' + jsonOBJ[i].id + '<br/>';
    content += '使用者：' + jsonOBJ[i].name + '<br/>';
    content += '地址：' + jsonOBJ[i].address + '<br/>';
    content += '電話：' + jsonOBJ[i].cellphone + '<br/>';
    content += '司機預計到達時間：' + jsonOBJ[i].arrivalTime + '<br/>';
    content += '使用者回收物種類：' + jsonOBJ[i].objectID + '<br/>';
    content += '使用者回收物重量：' + jsonOBJ[i].weight + ' kg<br/>';
    content += '預計回收價錢：' + jsonOBJ[i].profit + ' 元<br/>';

    if (jsonOBJ[i].status == 1) {
        content += '訂單狀態：未交接<br/>';
    } else if (jsonOBJ[i].status == 2) {
        content += '訂單狀態：已交接<br/>';
    }
    content += '<br/>';
    div2.innerHTML = content;
    div1.appendChild(div2);
    orderData.appendChild(div1);
}

//顯示司機總覽資料 -> showTotalDriver
function showDriver(jsonOBJ) {
    clearTotalDriver();
    clearInterval(window.interval);
    for (i = 0; i < jsonOBJ.length; i++) {
        var ol = document.createElement('ol');
        ol.setAttribute('class', 'nav-sidebar');

        var id = jsonOBJ[i].driverID;
        ol.setAttribute('id', id);
        ol.setAttribute('onclick', 'addDriverPoint(id)');

        var li1 = document.createElement('li'),
            li2 = document.createElement('li'),
            li3 = document.createElement('li'),
            //li4 = document.createElement('li'),
            li5 = document.createElement('li'),
            btn = document.createElement('button');
        var content1 = '司機ID：' + jsonOBJ[i].driverID,
            content2 = '負責路線ID：' + jsonOBJ[i].routeID,
            content3 = '完成度：' + jsonOBJ[i].finishedPercent + '%';
        li1.innerHTML = content1;
        li2.innerHTML = content2;
        li3.innerHTML = content3;
        //li4.innerHTML = content4;
        btn.setAttribute('type', 'button');
        btn.innerHTML = '詳細';
        btn.setAttribute('class', 'btn btn-default');
        btn.setAttribute('data-toggle', 'collapse');
        var datatarget = '#collapse-car' + jsonOBJ[i].driverID;
        btn.setAttribute('data-target', datatarget);
        btn.setAttribute('style', 'color: black');
        btn.setAttribute('aria-expanded', 'false');
        var ariacontrols = 'collapse-car' + jsonOBJ[i].driverID;
        btn.setAttribute('aria-controls', ariacontrols);

        li5.appendChild(btn);
        ol.appendChild(li1);
        ol.appendChild(li2);
        ol.appendChild(li3);
        //ol.appendChild(li4);
        ol.appendChild(li5);
        driverData.appendChild(ol);
        showTotalDriver(jsonOBJ, i);
    }
}

//顯示司機詳細資料
function showTotalDriver(jsonOBJ, i) {
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'collapse');
    var id = 'collapse-car' + jsonOBJ[i].driverID;
    div1.setAttribute('id', id);
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'card card-body');
    var content;
    content = '司機ID：' + jsonOBJ[i].driverID + '<br/>';
    content += '負責路線ID：' + jsonOBJ[i].routeID + '<br/>';
    content += '司機姓名：' + jsonOBJ[i].name + '<br/>';
    content += '車牌：' + jsonOBJ[i].licensePlate + '<br/>';
    content += '連絡電話：' + jsonOBJ[i].phone + '<br/>';
    content += '當前位置：' + jsonOBJ[i].dynamicAddress + '<br/>';
    content += '完程度：' + jsonOBJ[i].finishedPercent + '%<br/>';

    content += '<br/>';
    div2.innerHTML = content;
    div1.appendChild(div2);
    driverData.appendChild(div1);
}

//顯示路線總覽資料 -> requestingData_specificRoute, showTotalRoute
function showRoute(jsonOBJ) {
    clearTotalRoute();
    clearInterval(window.interval);
    for (i = 0; i < jsonOBJ.length; i++) {
        var div = document.createElement('div');
        div.setAttribute('class', 'nav-sidebar');
        var id = jsonOBJ[i].driverID;
        div.setAttribute('id', id);
        // div.setAttribute('onclick', 'highlightDriverfromRoute(id)');

        var ol = document.createElement('ol');

        var id = jsonOBJ[i].routeID;
        ol.setAttribute('id', id);
        ol.setAttribute('onclick', 'requestingData_specificRoute(id)');

        jsonOBJ[i].orders = jsonOBJ[i].orders.sort(function(a, b) {
            return a.orderSequence > b.orderSequence ? 1 : -1;
        });

        var li1 = document.createElement('li'),
            li2 = document.createElement('li'),
            li3 = document.createElement('li'),
            li4 = document.createElement('li'),
            li5 = document.createElement('li'),
            btn = document.createElement('button');
        var content1 = '路線ID：' + jsonOBJ[i].routeID,
            content2 = '司機ID：' + jsonOBJ[i].driverID,
            content3 = '日期：' + jsonOBJ[i].date,
            content4 = '交接進度：' + jsonOBJ[i].finishedPercent + '%';
        li1.innerHTML = content1;
        li2.innerHTML = content2;
        li3.innerHTML = content3;
        li4.innerHTML = content4;
        btn.setAttribute('type', 'button');
        btn.innerHTML = '詳細';
        btn.setAttribute('class', 'btn btn-default');
        btn.setAttribute('data-toggle', 'collapse');
        var datatarget = '#collapse-route' + jsonOBJ[i].routeID;
        btn.setAttribute('data-target', datatarget);
        btn.setAttribute('style', 'color: black');
        btn.setAttribute('aria-expanded', 'false');
        var ariacontrols = 'collapse-route' + jsonOBJ[i].routeID;
        btn.setAttribute('aria-controls', ariacontrols);

        li5.appendChild(btn);
        ol.appendChild(li1);
        ol.appendChild(li2);
        ol.appendChild(li3);
        ol.appendChild(li4);
        ol.appendChild(li5);
        div.appendChild(ol);
        routeData.appendChild(div);
        showTotalRoute(jsonOBJ, i);
    }
}

//顯示路線詳細資料
function showTotalRoute(jsonOBJ, i) {
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'collapse');
    var id = 'collapse-route' + jsonOBJ[i].routeID;
    div1.setAttribute('id', id);
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'card card-body');
    var content;
    content = '路線ID：' + jsonOBJ[i].routeID + '<br/>';
    content += '司機ID：' + jsonOBJ[i].driverID + '<br/>';
    content += '日期：' + jsonOBJ[i].date + '<br/>';
    content += '總收益：' + jsonOBJ[i].totalProfit + '<br/>';
    content += '路線成本：' + jsonOBJ[i].cost + '<br/>';
    content += '交接進度：' + jsonOBJ[i].finishedPercent + '%<br/>';
    content += '<br/>';
    content += '路線上的訂單：<br/>';
    content += '<br/>';

    for (j = 0; j < jsonOBJ[i].orders.length; j++) {
        content += '<span>訂單ID：' + jsonOBJ[i].orders[j].orderID + '</span><br/>';
        content += '訂單順序：' + jsonOBJ[i].orders[j].orderSequence + '<br/>';
        content += '訂單地址：' + jsonOBJ[i].orders[j].orderAddress + '<br/>';
        content += '預計到達時間：' + jsonOBJ[i].orders[j].arrivalTime + '<br/>';
        if (jsonOBJ[i].orders[j].finish == 0) {
            content += '訂單狀態：未交接<br/>';
        } else if (jsonOBJ[i].orders[j].finish == 1) {
            content += '訂單狀態：已交接<br/>';
        }
        content += '<hr/>'
    }
    div2.innerHTML = content;
    div1.appendChild(div2);
    routeData.appendChild(div1);
}

//顯示對應的司機 -> showTotalDriver
function highlightDriverfromRoute(jsonOBJ, driverID) {
    clearTotalDriver();
    // jsonOBJ = window.specificDriver;
    for (i = 0; i < jsonOBJ.length; i++) {
        if (jsonOBJ[i].driverID == driverID) {
            var ol = document.createElement('ol');
            ol.setAttribute('class', 'nav-sidebar');

            var id = jsonOBJ[i].driverID;
            ol.setAttribute('id', id);
            ol.setAttribute('onclick', 'addDriverPoint(id)');

            var li1 = document.createElement('li'),
                li2 = document.createElement('li'),
                li3 = document.createElement('li'),
                //li4 = document.createElement('li'),
                li5 = document.createElement('li'),
                btn = document.createElement('button');
            var content1 = '司機ID：' + jsonOBJ[i].driverID,
                content2 = '負責路線ID：' + jsonOBJ[i].routeID,
                content3 = '完成度：' + jsonOBJ[i].finishedPercent + '%';
            li1.innerHTML = content1;
            li2.innerHTML = content2;
            li3.innerHTML = content3;
            //li4.innerHTML = content4;
            btn.setAttribute('type', 'button');
            btn.innerHTML = '詳細';
            btn.setAttribute('class', 'btn btn-default');
            btn.setAttribute('data-toggle', 'collapse');
            var datatarget = '#collapse-car' + jsonOBJ[i].driverID;
            btn.setAttribute('data-target', datatarget);
            btn.setAttribute('style', 'color: black');
            btn.setAttribute('aria-expanded', 'false');
            var ariacontrols = 'collapse-car' + jsonOBJ[i].driverID;
            btn.setAttribute('aria-controls', ariacontrols);

            li5.appendChild(btn);
            ol.appendChild(li1);
            ol.appendChild(li2);
            ol.appendChild(li3);
            //ol.appendChild(li4);
            ol.appendChild(li5);
            driverData.appendChild(ol);
            showTotalDriver(jsonOBJ, i);
        }
    }
}

//清空訂單資訊
function clearTotalOrder() {
    console.log("removing orders...");
    $('#home').empty();
}

//清空路線資訊
function clearTotalRoute() {
    console.log("removing routes...");
    $('#profile').empty();
}

//清空司機資訊
function clearTotalDriver() {
    console.log("removing drivers...");
    $('#driver').empty();
}

//定時更新路線資料、畫全訂單 -> requestingData_Order_showall
function addTotalOrdertoMap() {
    requestingData_Order_showall();
    clearInterval(window.interval);
    window.interval = setInterval(function() {
        requestingData_Order_showall();
    }, 10000);
}

//定時更新路線資料、畫全路線 -> requestingData_Route_showall
function addTotalRoutestoMap() {
    requestingData_Route_showall();
    // requestingData_Driver_showall_route();

    clearInterval(window.interval);
    window.interval = setInterval(function() {
        requestingData_Route_showall();

        // addTotalDriver();
    }, 10000);
}

//定時更新司機資料、畫全司機 -> requestingData_Driver_showall
function addTotalDrivertoMap() {
    requestingData_Driver_showall();
    // addTotalDriver();
    clearInterval(window.interval);
    window.interval = setInterval(function() {
        requestingData_Driver_showall();
        // addTotalDriver();
    }, 10000);
}

//定時更新司機資料，畫路線上的司機位置 -> requestingData_Driver_route, requestingData_Driver_highlight
function addDrivertoMapfromroute(index) {
    requestingData_Driver_route(index);
    requestingData_Driver_highlight(index);
    clearInterval(window.interval);

    window.interval = setInterval(function() {
        requestingData_Driver_route(index);
        // addTotalDriver();
    }, 10000);
}

//搜尋司機ID -> requestingData_Driver_highlight
function findDriverIDfromOrder(jsonOBJ, index) {
    for (i = 0; i < jsonOBJ.length; i++) {
        for (j = 0; j < jsonOBJ[i].orders.length; j++) {
            if (jsonOBJ[i].orders[j].orderID == index) {
                requestingData_Driver_highlight(jsonOBJ[i].driverID);
            }
        }
    }
}

//map
//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
    app_id: app_id,
    app_code: app_code,
    useCIT: true,
    useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Taiwan
var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, {
        center: { lat: 25.0192822, lng: 121.5395547 },
        zoom: 14
    });
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


//切換語言
function setBaseLayer(map, platform) {
    var mapTileService = platform.getMapTileService({
        type: 'base'
    });
    var parameters = {
        lg: 'cht'
    }; //繁體中文 cht 簡體中文 chi
    var tileLayer = mapTileService.createTileLayer(
        'maptile',
        'normal.day',
        256,
        'png8',
        parameters
    );
    map.setBaseLayer(tileLayer);
}

setBaseLayer(map, platform)


//在地圖上標記單一點 (訂單位置點點)
function addOrderPoint(index) {
    //var orderpointgroup = new H.map.Group();
    console.log("addOrderPoint");
    var x;
    for (x of window.totalOrder) {
        if (x.id == index) {
            //console.log(x);
            var lat = x.latitude;
            var lng = x.longitude;
            var truckIcon_unfill = new H.map.Icon('img/order.png');
            var truckIcon_filled = new H.map.Icon('img/order-filled.png');
            if (x.status == 2) {
                var orderpointMarker = new H.map.Marker({
                    lat: lat,
                    lng: lng
                }, { icon: truckIcon_filled });
            } else if (x.status == 1) {
                var orderpointMarker = new H.map.Marker({
                    lat: lat,
                    lng: lng
                }, { icon: truckIcon_unfill });
            }


            //orderpointgroup.addObject(orderpointMarker);
            /*orderpointgroup.addEventListener('tap', function(evt) {
                map.setCenter(evt.target.getPosition());
                openBubble(
                    evt.target.getPosition(), evt.target.waypointinfo);
            }, false);*/

            // map.setCenter(orderpointMarker.getPosition());
            // map.setZoom(14);
            map.removeObjects(map.getObjects());
            map.addObject(orderpointMarker);
        }
    }
}

//在地圖上標記所有訂單
function addTotalOrder(jsonOBJ) {
    map.removeObjects(map.getObjects());
    console.log("addTotalOrder");
    // var orderpointgroup = new H.map.Group();
    var x;
    for (x of jsonOBJ) {
        var lat = x.latitude;
        var lng = x.longitude;
        var truckIcon_unfill = new H.map.Icon('img/order.png');
        var truckIcon_filled = new H.map.Icon('img/order-filled.png');
        if (x.status == 2) {
            var orderpointMarker = new H.map.Marker({
                lat: lat,
                lng: lng
            }, { icon: truckIcon_filled });
        } else if (x.status == 1) {
            var orderpointMarker = new H.map.Marker({
                lat: lat,
                lng: lng
            }, { icon: truckIcon_unfill });
        }
        map.addObject(orderpointMarker);
        // orderpointgroup.addObject(orderpointMarker);

    }
    // orderpointgroup.addEventListener('tap', function(evt) {
    //     map.setCenter(evt.target.getPosition());
    //     openBubble(
    //         evt.target.getPosition(), evt.target.waypointinfo);
    // }, false);

    // map.setViewBounds(orderpointgroup.getBounds(), true);
    // map.removeObjects(map.getObjects());
    // map.addObject(orderpointgroup);
}

//在地圖上標記司機 (車輛管理用)
function addDriverPoint(index) {
    // var driverpointgroup = new H.map.Group();
    console.log("addDriverPoint-driver");
    var x;
    for (x of window.totalDriver) {
        if (x.driverID == index) {
            //console.log(x);
            var latlng = x.dynamicLocation.split(',');
            var lat = latlng[0];
            var lng = latlng[1];

            var truckIcon = new H.map.Icon('img/driver.png');
            var driverpointMarker = new H.map.Marker({
                lat: lat,
                lng: lng
            }, { icon: truckIcon });

            // driverpointgroup.addObject(driverpointMarker);
            /*driverpointgroup.addEventListener('tap', function(evt) {
                map.setCenter(evt.target.getPosition());
                map.removeObjects(map.getObjects());
                openBubble(
                    evt.target.getPosition(), evt.target.waypointinfo);
            }, false);*/

            // map.setCenter(driverpointMarker.getPosition());
            // map.setZoom(14);
            map.removeObjects(map.getObjects());
            map.addObject(driverpointMarker);
        }
    }
}

//在地圖上標記司機 (路線管理用-顯示單一路線)
function addDriverPoint_route(jsonOBJ) {
    // var driverpointgroup = new H.map.Group();
    console.log("addDriverPoint-route");
    var x;
    // for (x of window.totalDriver) {
    // if (x.driverID == index) {
    //console.log(x);
    var latlng = jsonOBJ.dynamicLocation.split(',');
    var lat = latlng[0];
    var lng = latlng[1];

    var truckIcon = new H.map.Icon('img/driver.png');
    var driverpointMarker = new H.map.Marker({
        lat: lat,
        lng: lng
    }, { icon: truckIcon });

    // driverpointgroup.addObject(driverpointMarker);
    /*driverpointgroup.addEventListener('tap', function(evt) {
        map.setCenter(evt.target.getPosition());
        map.removeObjects(map.getObjects());
        openBubble(
            evt.target.getPosition(), evt.target.waypointinfo);
    }, false);*/

    // map.setCenter(driverpointMarker.getPosition());
    // map.setZoom(14);
    // map.removeObjects(map.getObjects());
    map.addObject(driverpointMarker);
    // }
    // }
}

//標記所有司機 (顯示全司機用)
function addTotalDriver(jsonOBJ) {
    // var driverpointgroup = new H.map.Group();
    map.removeObjects(map.getObjects());
    var x;
    for (x of jsonOBJ) {
        var latlng = x.dynamicLocation.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        var truckIcon = new H.map.Icon('img/driver.png');
        var driverpointMarker = new H.map.Marker({
            lat: lat,
            lng: lng
        }, { icon: truckIcon });
        // driverpointgroup.addObject(driverpointMarker);
        map.addObject(driverpointMarker);
    }
    // driverpointgroup.addEventListener('tap', function(evt) {
    //     map.setCenter(evt.target.getPosition());
    //     /*openBubble(
    //         evt.target.getPosition(), evt.target.waypointinfo);*/
    // }, false);

    // map.setViewBounds(driverpointgroup.getBounds(), true);
    // map.removeObjects(map.getObjects());
    // map.addObject(driverpointgroup);
}

//標記所有司機 (顯示全路線用)
function addTotalDriver_route(jsonOBJ) {
    // map.removeObjects(map.getObjects());
    var x;
    for (x of jsonOBJ) {
        var latlng = x.dynamicLocation.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        var truckIcon = new H.map.Icon('img/driver.png');
        var driverpointMarker = new H.map.Marker({
            lat: lat,
            lng: lng
        }, { icon: truckIcon });
        // driverpointgroup.addObject(driverpointMarker);
        map.addObject(driverpointMarker);
    }
}

//製作單一路線經緯度資料集 -> addDrivertoMapfromroute
function sequenceToRouting(jsonOBJ) {
    map.removeObjects(map.getObjects());
    addDrivertoMapfromroute(jsonOBJ.driverID);
    var sequences = [],
        finishNumber = 0;

    jsonOBJ.orders = jsonOBJ.orders.sort(function(a, b) {
        return a.orderSequence > b.orderSequence ? 1 : -1;
    });

    for (i = 0; i < jsonOBJ.orders.length; i++) {
        if (jsonOBJ.orders[i].finish == 1) {
            finishNumber += 1;
        }
    }
    if (finishNumber == 0) {
        for (k = 0; k < jsonOBJ.orders.length; k++) {
            sequence = jsonOBJ.orders[k].latitude + ',' + jsonOBJ.orders[k].longitude;
            sequences.push(sequence)
        }
        calculateRoutesFromAtoB_unfill_whole(platform, sequences);
    } else {
        for (k = finishNumber - 1; k < jsonOBJ.orders.length; k++) {
            sequence = jsonOBJ.orders[k].latitude + ',' + jsonOBJ.orders[k].longitude;
            sequences.push(sequence)
        }
        calculateRoutesFromAtoB_unfill(platform, sequences);

        sequences = [];
        for (k = 0; k < finishNumber; k++) {
            sequence = jsonOBJ.orders[k].latitude + ',' + jsonOBJ.orders[k].longitude;
            sequences.push(sequence)
        }
        calculateRoutesFromAtoB_filled(platform, sequences);
    }
}

function onSuccess_unfill(result) {
    //console.log(result);
    // map.removeObjects(map.getObjects());
    var route = result.response.route[0];

    addWaypointsMapMarker_unfill(route.waypoint);
    addRouteShapeToMap_unfill(route);
}

function onSuccess_unfill_whole(result) {
    //console.log(result);
    // map.removeObjects(map.getObjects());
    var route = result.response.route[0];

    addWaypointsMapMarker_unfill_whole(route.waypoint);
    addRouteShapeToMap_unfill(route);
}

// -> addWaypointsMapMarker, addRouteShapeToMap
function onSuccess_filled(result) {
    //console.log(result);
    // map.removeObjects(map.getObjects());
    var route = result.response.route[0];

    addWaypointsMapMarker_filled(route.waypoint);
    addRouteShapeToMap_filled(route);
}

function onError(error) {
    alert('Can\'t reach the remote server');
}


//在地圖上標記每個停留點 Waypoints
function addWaypointsMapMarker_unfill(waypoints) {
    var truckIcons = [];
    for (j = 0; j <= 99; j += 1) {
        var svgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#ed0034" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">' + j + '</text></svg>';

        var truckIcon = new H.map.Icon(svgMarkup);
        truckIcons.push(truckIcon)
    }
    // var waypointsgroup = new H.map.Group();
    var i;

    for (i = 1; i < waypoints.length; i += 1) {
        // Get the next waypoint.
        var waypointslat = waypoints[i].mappedPosition.latitude;
        var waypointslng = waypoints[i].mappedPosition.longitude;

        // Add a marker to the waypoints group
        var waypointsMarker = new H.map.Marker({
            lat: waypointslat,
            lng: waypointslng
        }, { icon: truckIcons[i-1] });
        /*if (i == 0) {
            waypointsMarker.waypointinfo = window.Origin;
        } else {
            waypointsMarker.waypointinfo = window.waypointinfo[i - 1][0];
        }*/


        // waypointsgroup.addObject(waypointsMarker);
        map.addObject(waypointsMarker);
    }

    // waypointsgroup.addEventListener('tap', function(evt) {
    //     map.setCenter(evt.target.getPosition());
    //     /*openBubble(
    //         evt.target.getPosition(), evt.target.waypointinfo);*/
    // }, false);


    // map.addObject(waypointsgroup);
}

function addWaypointsMapMarker_unfill_whole(waypoints) {
    var truckIcons = [];
    for (j = 0; j <= 99; j += 1) {
        var svgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#ed0034" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">' + j + '</text></svg>';

        var truckIcon = new H.map.Icon(svgMarkup);
        truckIcons.push(truckIcon)
    }
    // var waypointsgroup = new H.map.Group();
    var i;

    for (i = 0; i < waypoints.length; i += 1) {
        // Get the next waypoint.
        var waypointslat = waypoints[i].mappedPosition.latitude;
        var waypointslng = waypoints[i].mappedPosition.longitude;

        // Add a marker to the waypoints group
        var waypointsMarker = new H.map.Marker({
            lat: waypointslat,
            lng: waypointslng
        }, { icon: truckIcons[i] });
        /*if (i == 0) {
            waypointsMarker.waypointinfo = window.Origin;
        } else {
            waypointsMarker.waypointinfo = window.waypointinfo[i - 1][0];
        }*/


        // waypointsgroup.addObject(waypointsMarker);
        map.addObject(waypointsMarker);
    }

    // waypointsgroup.addEventListener('tap', function(evt) {
    //     map.setCenter(evt.target.getPosition());
    //     /*openBubble(
    //         evt.target.getPosition(), evt.target.waypointinfo);*/
    // }, false);


    // map.addObject(waypointsgroup);
}

function addWaypointsMapMarker_filled(waypoints) {
    var truckIcons = [];
    for (j = 0; j <= 99; j += 1) {
        var svgMarkup = '<svg width="24" height="24" ' +
            'xmlns="http://www.w3.org/2000/svg">' +
            '<rect stroke="white" fill="#131af9" x="1" y="1" width="22" ' +
            'height="22" /><text x="12" y="18" font-size="12pt" ' +
            'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
            'fill="white">' + j + '</text></svg>';

        var truckIcon = new H.map.Icon(svgMarkup);
        truckIcons.push(truckIcon)
    }
    // var waypointsgroup = new H.map.Group();
    var i;

    for (i = 0; i < waypoints.length; i += 1) {
        // Get the next waypoint.
        var waypointslat = waypoints[i].mappedPosition.latitude;
        var waypointslng = waypoints[i].mappedPosition.longitude;

        // Add a marker to the waypoints group
        var waypointsMarker = new H.map.Marker({
            lat: waypointslat,
            lng: waypointslng
        }, { icon: truckIcons[i] });
        /*if (i == 0) {
            waypointsMarker.waypointinfo = window.Origin;
        } else {
            waypointsMarker.waypointinfo = window.waypointinfo[i - 1][0];
        }*/


        // waypointsgroup.addObject(waypointsMarker);
        map.addObject(waypointsMarker);
    }

    // waypointsgroup.addEventListener('tap', function(evt) {
    //     map.setCenter(evt.target.getPosition());
    //     /*openBubble(
    //         evt.target.getPosition(), evt.target.waypointinfo);*/
    // }, false);


    // map.addObject(waypointsgroup);
}

//路徑規劃的線畫在地圖上 H.map.Polyline (全路線)
function addRouteShapeToMap_unfill(route) {
    var lineString = new H.geo.LineString(),
        routeShape = route.shape,
        polyline;

    routeShape.forEach(function(point) {
        var parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(lineString, {
        style: {
            lineWidth: 10,
            strokeColor: 'rgba(255, 136, 79, 0.85)'
        },
        arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
    });
    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    // map.setViewBounds(polyline.getBounds(), true);
}

//路徑規劃的線畫在地圖上 H.map.Polyline (單一路線)
function addRouteShapeToMap_filled(route) {
    var lineString = new H.geo.LineString(),
        routeShape = route.shape,
        polyline;

    routeShape.forEach(function(point) {
        var parts = point.split(',');
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(lineString, {
        style: {
            lineWidth: 10,
            strokeColor: 'rgba(79, 190, 255, 0.85)'
        },
        arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
    });
    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    // map.setViewBounds(polyline.getBounds(), true);
}

//製作全路線經緯度資料集 -> requestingData_Driver_showall_route
function sequencesToRouting(jsonOBJ) {
    map.removeObjects(map.getObjects());
    requestingData_Driver_showall_route();
    //var finishNumber;
    for (x of jsonOBJ) {
        x.orders = x.orders.sort(function(a, b) {
            return a.orderSequence > b.orderSequence ? 1 : -1;
        });
        finishNumber = 0;
        for (i = 0; i < x.orders.length; i++) {
            if (x.orders[i].finish == 1) {
                finishNumber += 1;
            }
        }

        sequences = [];
        if (finishNumber == 0) {
            for (k = 0; k < x.orders.length; k++) {
                sequence = x.orders[k].latitude + ',' + x.orders[k].longitude;
                sequences.push(sequence)
            }
            calculateRoutesFromAtoB_unfill_whole(platform, sequences);
        } else {
            for (k = finishNumber - 1; k < x.orders.length; k++) {
                sequence = x.orders[k].latitude + ',' + x.orders[k].longitude;
                sequences.push(sequence)
            }
            calculateRoutesFromAtoB_unfill(platform, sequences);
            sequences = [];
            for (k = 0; k < finishNumber; k++) {
                sequence = x.orders[k].latitude + ',' + x.orders[k].longitude;
                sequences.push(sequence)
            }
            calculateRoutesFromAtoB_filled(platform, sequences);
        }

        /*var sequences = [];
        for (k = 0; k < x.orders.length; k++) {
            sequence = x.orders[k].latitude + ',' + x.orders[k].longitude;
            sequences.push(sequence)
        }
        calculateRoutesFromAtoB(platform, sequences);*/
    }
}

//單一路徑路線規劃
function calculateRoutesFromAtoB_unfill(platform, sequences) {
    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
        };

    waypoints = [];
    for (j = 0; j < sequences.length; j++) {
        waypoint = 'waypoint' + j;
        waypoints.push(waypoint);
        routeRequestParams[waypoints[j]] = sequences[j];
    }
    /*for (k = 0; k <= sequences.length; k++) {
        routeRequestParams[waypoints[k]] = sequences[k];
    }*/

    router.calculateRoute(
        routeRequestParams,
        onSuccess_unfill,
        onError
    );
}

function calculateRoutesFromAtoB_unfill_whole(platform, sequences) {
    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
        };

    waypoints = [];
    for (j = 0; j < sequences.length; j++) {
        waypoint = 'waypoint' + j;
        waypoints.push(waypoint);
        routeRequestParams[waypoints[j]] = sequences[j];
    }
    /*for (k = 0; k <= sequences.length; k++) {
        routeRequestParams[waypoints[k]] = sequences[k];
    }*/

    router.calculateRoute(
        routeRequestParams,
        onSuccess_unfill_whole,
        onError
    );
}

//全路線路徑規劃
function calculateRoutesFromAtoB_filled(platform, sequences) {
    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action',
        };

    waypoints = [];
    for (j = 0; j < sequences.length; j++) {
        waypoint = 'waypoint' + j;
        waypoints.push(waypoint);
        routeRequestParams[waypoints[j]] = sequences[j];
    }
    /*for (k = 0; k <= sequences.length; k++) {
        routeRequestParams[waypoints[k]] = sequences[k];
    }*/

    router.calculateRoute(
        routeRequestParams,
        onSuccess_filled,
        onError
    );
}

//清空地圖
function clearMap() {
    clearInterval(window.interval);
    map.removeObjects(map.getObjects());
}