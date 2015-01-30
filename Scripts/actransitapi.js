var actransit = actransit || {};
actransit.api = actransit.api || {};

actransit.api.config = {
    baseUri: "http://testapi.actransit.org/transit/"
    //baseUri: "http://localhost:64643/"
};

actransit.api.routeUrl = function () {
    return actransit.api.config.baseUri + "routes";
};

actransit.api.directionUrl = function (route) {
    return actransit.api.config.baseUri + "route/" + route + "/directions";
};

actransit.api.tripUrl = function (route, direction, scheduleType) {
    var url = actransit.api.config.baseUri + "route/" + route + "/trips";

    if (direction && scheduleType)
        url += "/?direction=" + direction + "&scheduleType" + scheduleType;
    else if (direction)
        url += "/?direction=" + direction;
    else if (scheduleType)
        url += "/?scheduleType=" + scheduleType;

    if (direction && direction.trim() !== "")
        url += "/" + direction;
    return url;
};

actransit.api.routeVehicleUrl = function (route) {
    return actransit.api.config.baseUri + "route/" + route + "/vehicles";
};

actransit.api.vehicleUrl = function(vehicle) {
    return actransit.api.config.baseUri + "vehicle/" + vehicle;
};

actransit.api.tripPatternUrl = function(route, trip) {
    return actransit.api.config.baseUri + "route/" + route + "/trip/" + trip + "/pattern";
};

actransit.api.tripStopsUrl = function (route, trip) {
    return actransit.api.config.baseUri + "route/" + route + "/trip/" + trip + "/stops";
};

actransit.api.allStopsUrl = function () {
    return actransit.api.config.baseUri + "stops";
};

actransit.api.stopPredictionsUrl = function (stop) {
    return actransit.api.config.baseUri + "stops/" + stop + "/predictions";
};

actransit.api.stopsInProximity = function (latitude, longitude, distance) {
    return actransit.api.config.baseUri + "stops/" + latitude + "/" + longitude + "/" + distance;
};