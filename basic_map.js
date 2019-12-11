function moveMapToTaipei(map) {
    map.setCenter({ lat: 25.0192822, lng: 121.5395547 });
    map.setZoom(14);
}



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
        center: { lat: 25, lng: 121 },
        zoom: 6
    });
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

//Step 4:use the map as required... 啟動一個 function
//封裝，與 addEventListener 都可以做
window.onload = function() {
    moveMapToTaipei(map);
}

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

//在地圖上標記點 (訂單位置點點)
function addOrderPoint(lat, lng) {
    var waypointsMarker = new H.map.Marker({
        lat: waypointslat,
        lng: waypointslng
    }, { icon: truckIcons[i] });
}

//在地圖上標記每個停留點 Waypoints (路線上的所有訂單點點)


//路徑規劃的線畫在地圖上 H.map.Polyline
function addRouteShapeToMap(route) {
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
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        },
        arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
    });
    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.setViewBounds(polyline.getBounds(), true);
}