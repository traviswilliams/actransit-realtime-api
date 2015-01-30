var actransit = actransit || {};
actransit.maps = actransit.maps || {};

actransit.maps.Map = function (mapId, stopIconUrl, busIconUrl) {
    /* private variables */
    var mapElementId = mapId;
    var map = null;
    var mapRightClicked = function (event) { };
    var stopIcon = stopIconUrl;
    var busIcon = busIconUrl;

    var data = {
        stops: [],
        vehicles: [],
        overlays: [],
        patterns: []
    };

    /* properties */
    this.config = {
        center: { lat: 37.805281, lng: -122.268523 },
        zoom: 10
    };

    this.symbols = {

    };

    /* methods */
    this.init = function() {
        map = new google.maps.Map(document.getElementById(mapElementId), this.config);
        google.maps.event.addListener(map, 'rightclick', function(event) { mapRightClicked(event); });
    };

    this.setMapRightClicked = function(func) {
        mapRightClicked = func;
    }

    this.setCenter = function(lat, lng) {
        map.setCenter(new google.maps.LatLng(lat, lng));
    };

    this.getCenter = function() {
        return map.getCenter();
    }

    this.addStop = function(stop, clickDelegate) {
        var image = {
            url: stopIcon
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(stop.Latitude, stop.Longitude),
            map: map,
            title: stop.Name,
            icon: image,
            stop: stop
        });

        if (clickDelegate)
            marker.clickListener = google.maps.event.addListener(marker, 'click', function () { clickDelegate(stop); });

        data.stops.push(marker);
    };

    this.addVehicle = function(vehicle, clickDelegate) {
        var image = {
            url: busIconUrl
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(vehicle.Latitude, vehicle.Longitude),
            map: map,
            title: "Vehicle: " + vehicle.VehicleId,
            icon: image,
            vehicle: vehicle
        });

        if (clickDelegate)
            marker.clickListener = google.maps.event.addListener(marker, 'click', function () { clickDelegate(vehicle); });

        data.vehicles.push(marker);
    };

    this.addCircle = function(lat, lng, radius) {
        var circle = new google.maps.Circle({
            center: new google.maps.LatLng(lat, lng),
            map: map,
            radius: parseInt(radius) / 2,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0099dd",
            fillOpacity: 0.3,
            circle: true
        });

        circle.clickListener = google.maps.event.addListener(circle, 'rightclick', function (event) { mapRightClicked(event); }),


        data.overlays.push(circle);
    };

    this.removeMarker = function (item) {
        var type = "vehicle";
        if (item.stop)
            type = "stop";
        else if (item.circle)
            type = "overlay";

        var arr = getDataArray(type);

        var i = arr.length - 1;
        for (; i >= 0; i--) {
            if (arr[i].position.lat == lat && arr[i].position.lng == lng) {
                arr[i].setMap(null);

                if (arr[i].clickListener)
                    google.maps.event.removeListener(arr[i].clickListener);

                arr.splice(i, 1);
            }
        }
    };

    this.clearMarkers = function(type) {
        if (!type) {
            this.clearMarkers("stop");
            this.clearMarkers("vehicle");
            this.clearMarkers("overlay");
            return;
        };

        var arr = getDataArray(type);

        for (var i = 0; i < arr.length; i++) 
            arr[i].setMap(null);

        arr.length = 0;
    };

    this.addPattern = function(tripId, coords) {
        var path = [];
        for (var i = 0; i < coords.length; i++) {
            path.push(new google.maps.LatLng(coords[i].lat, coords[i].lng));
        }

        var polyline = new google.maps.Polyline({
            path: path,
            strokeColor: '#ff0000',
            strokOpacity: 0.8,
            strokeWeight: 2,
            map: map
        });

        data.patterns.push({ tripId: tripId, polyline: polyline });
    };

    this.removePattern = function (tripId) {
        var i = data.patterns.length - 1;
        for (; i >= 0; i--) {
            if (data.patterns.tripId == tripId) {
                data.patterns[i].setMap(null);
                data.patterns.splice(i, 1);
            };
        }
    };

    this.clearPatterns = function() {
        var i = data.patterns.length - 1;
        for (; i >= 0; i--) {
            data.patterns[i].polyline.setMap(null);
            data.patterns.splice(i, 1);
        }
    };

    /* private methods */
    var getDataArray = function(type) {
        switch(type) {
            case "stops":
            case "stop":
                return data.stops;
            case "overlay":
            case "overlays":
                return data.overlays;
            default:
                return data.vehicles;
        }
    };
};