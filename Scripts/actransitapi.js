var actransit = actransit || {};
actransit.api = actransit.api || {};

actransit.api.config = {
    baseUri: "http://api.actransit.org/transit/",
    token: "[YOUR ACTRANSIT API TOKEN HERE]"
};

actransit.api.routeUrl = function () {
    return actransit.api.config.baseUri + "routes?token=" + actransit.api.config.token;
};

actransit.api.directionUrl = function (route) {
    return actransit.api.config.baseUri + "route/" + route + "/directions?token=" + actransit.api.config.token;
};

actransit.api.tripUrl = function (route, direction, scheduleType) {
    var url = actransit.api.config.baseUri + "route/" + route + "/trips" + "/?token=" + actransit.api.config.token;

    if (direction && direction.trim() !== "")
        url += "&direction=" + direction;
    else if (scheduleType)
        url += "&scheduleType=" + scheduleType;

    return url;
};

actransit.api.routeVehicleUrl = function (route) {
    return actransit.api.config.baseUri + "route/" + route + "/vehicles?token=" + actransit.api.config.token;
};

actransit.api.vehicleUrl = function(vehicle) {
    return actransit.api.config.baseUri + "vehicle/" + vehicle + "?token=" + actransit.api.config.token;
};

actransit.api.tripPatternUrl = function(route, trip) {
    return actransit.api.config.baseUri + "route/" + route + "/trip/" + trip + "/pattern?token=" + actransit.api.config.token;
};

actransit.api.tripStopsUrl = function (route, trip) {
    return actransit.api.config.baseUri + "route/" + route + "/trip/" + trip + "/stops?token=" + actransit.api.config.token;
};

actransit.api.allStopsUrl = function () {
    return actransit.api.config.baseUri + "stops?token=" + actransit.api.config.token;
};

actransit.api.stopPredictionsUrl = function (stop) {
    return actransit.api.config.baseUri + "stops/" + stop + "/predictions?token=" + actransit.api.config.token;
};

actransit.api.stopsInProximity = function (latitude, longitude, distance) {
    return actransit.api.config.baseUri + "stops/" + latitude + "/" + longitude + "/" + distance + "?token=" + actransit.api.config.token;
};