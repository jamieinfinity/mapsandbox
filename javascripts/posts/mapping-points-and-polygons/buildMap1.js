// the variable mapData is defined in ./dataMap1.js, which must be loaded in web page
// I'd rather load the data directly in this file, but haven't figure out how to do that

var geoJson;
var map;

function pointStyle(feature) {
    return {
        fillColor: feature.properties.color,
        color: feature.properties.color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.3
    }
};

function polygonStyle(feature) {
    return {
        fillColor: "#00aa33",
        color: "#00aa33",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.3
    }
};

function highlightFeature(event) {
    var layer = event.target;

    layer.setStyle({
        fillOpacity: .7
    });

    var popup = L.popup({closeButton: false}, layer)
        .setLatLng(event.latlng)
        .setContent(layer.feature.properties.description)
        .openOn(map);
}

function resetHighlight(event) {
    var layer = event.target;
    geoJson.resetStyle(layer);
    map.closePopup();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

var map = L.mapbox.map('mbmap', 'examples.map-20v6611k', {
    scrollWheelZoom: false
});
map.setView(new L.LatLng(38.6288, -90.193688), 16);

$.getJSON(BASE_URL + "/javascripts/posts/mapping-points-and-polygons/dataMap1.json", function(data) {
    var geoJson = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, 20);
        },
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'Point':
                    return pointStyle(feature);
                case 'Polygon':
                    return polygonStyle(feature);
            }
        },
        onEachFeature: onEachFeature
    }).addTo(map);
});


