//----Global vars for google maps traffic layers------------------------------//
var map = null;    
var trafficLayer=new google.maps.TrafficLayer();

//----Other global vars-------------------------------------------------------//
var mapObjects = []; //Collect markers and layers in an array to facilitate their
                     //display and removal.  
//----Functions---------------------------------------------------------------//
function trimet(passRouteInput) {
  //Accesses the TriMet API for live vehicle location info.
  //Input: Route number from user selection box.
  //Output: A data packet of relevant TriMet Vehicle info.
 
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
  var dataOut = [];
  var innerData;
  $.post(url + APPID, function(data) {
  data = data.resultSet.vehicle;
    $.each(data, function(index, value) { // Key into the inner JSON
      innerData = data[index];
      $.each(innerData, function(index1, value1) {
        if (index1 === "routeNumber" && value1 === Number(passRouteInput)) { 
          var dataPacket = [
            innerData.latitude,       //index = 0
            innerData.longitude,      //index = 1
            innerData.vehicleID,      //index = 2
            innerData.delay,          //index = 3
            innerData.direction,      //index = 4
            innerData.signMessageLong //index = 5
          ];
          dataOut.push(dataPacket);
          displayMarkers(dataOut);
        } 
      });
    });
  });
};

function check() {
  // Adds checkbox for live google traffic info.
  
  if (document.getElementById('traffic').checked) {
    trafficLayer.setMap(map);
  } else {
    trafficLayer.setMap(null);
  }
}

function displayMarkers(dataIn) {
  //Displays marker data from TriMet API data coordinates.
  //Input: output from triMet() function; an array of lat/long coordinates.
  //Output: A blue marker on the google map canvas if direction === 0; 
  //        A green marker on the google map canvas if direction === 1. 
  var markerData = dataIn;
  for( i = 0; i < markerData.length; i++ ) {
    var position = new google.maps.LatLng(markerData[i][0], markerData[i][1]);
    if (markerData[i][4] === 0) { 
      var marker = new google.maps.Marker({
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          clickable: true,
          zIndex: 999
      })
    } else {
      var marker = new google.maps.Marker({
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          clickable: true
      });
      }
    
    var infoContent = ("<h5><p> Vehicle Number: " + String(markerData[i][2]) + '</br>'
        +"<p>" + String(markerData[i][5]) + '</br>'
        +"<h6><p> Delay is: " + ((markerData[i][3])/60).toFixed(2) + " minutes." + '</br></h6>'
        //String(markerData[i][4]) 
        );
    marker.info = new google.maps.InfoWindow({
      content: infoContent
    })

    mapObjects.push(marker);
    //Zooms in on marker upon click.
    google.maps.event.addListener(marker, 'click', function() {
      map.panTo(this.getPosition());
      map.setZoom(15);
      this.info.open(map, this);
    });  
  }
}

//----Clear map marker functions---------------------------------------------//
// Sets the map on all mapObjects in the array.
function setMapOnAll(map) {
  for (var i = 0; i < mapObjects.length; i++) {
    mapObjects[i].setMap(map);
  }
}

// Removes the mapObjects from the map, but keeps them in the array.
function clearObjects() {
  setMapOnAll(null);
}

// Deletes all mapObjects in the array by removing references to them.
function deleteObjects() {
  clearObjects();
  mapObjects = [];
}
//----End clear map marker functions------------------------------------------//

function displayGeojson(dataIn) {
  var routeLayer = new google.maps.Data();
  routeLayer.setMap(null);
  var geojsonURL1 = 'http://localhost:9000/routeserver/';
  var geojsonURL2 = 'TMRoutes?=format%3Djson&format=json&rte=';
  var geojsonRteURL = dataIn;
  routeLayer.loadGeoJson(geojsonURL1 + geojsonURL2 + geojsonRteURL);
  routeLayer.setStyle({
    strokeColor: 'blue',
    strokeOpacity: 0.5,
  })
  routeLayer.setMap(map);
  mapObjects.push(routeLayer);

}//end displayGeojson

function displayRouteStops(dataIn) {
  var stopLayer = new google.maps.Data();
  stopLayer.setMap(null);
  var geojsonURL1 = 'http://localhost:9000/routeserver/';
  var geojsonURL2 = 'TMRouteStops?=format%3Djson&format=json&rte=';
  var geojsonStopURL = dataIn;
  stopLayer.loadGeoJson(geojsonURL1 + geojsonURL2 + geojsonStopURL);
  stopLayer.setStyle(function(feature) {
    return({
    icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png',
    visible: false,
    })
  })
  stopLayer.setMap(map);
  mapObjects.push(stopLayer);

  map.addListener('zoom_changed', function(event) {
    zoomLevel = map.getZoom();
    if (zoomLevel <= 10) {
      stopLayer.overrideStyle(event.feature, {visible: true});
    } else {
      stopLayer.revertStyle();
    }
  })
}//end displayGeojson 

//----The main google maps initialization function----------------------------//
function initialize(dataIn) {
  // First defines styles.
  var styles = [
    {
       stylers: [
        //{hue : "#084C8D" },
        {saturation : -75}
      ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {lightness : 100}
      ]
    },
    {
        featureType: 'transit.station',
        elementType: 'all',
        stylers: [
          {visibility: 'off'}
        ]
    }
  ];
  // Sets the desaturated style (defined above) to desaturated.
  var mapProp = {
    center:new google.maps.LatLng(45.5200,-122.6819),
    zoom:12,
    mapTypeControlOptions: {  
      mapTypeIds: [] // kept as an empty list because we want to disallow users
                     // to select other styling options. Maintains site "branding."
    }
  };
  
  map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  var mapType=new google.maps.StyledMapType(styles, {name : 'Desaturated'});
  map.mapTypes.set('desaturated', mapType);
  map.setMapTypeId('desaturated');



  //----Zooms to route extents------------------------------------------------//
  var bounds = new google.maps.LatLngBounds();
    map.data.addListener('addfeature', function (e) {
        processPoints(e.feature.getGeometry(), bounds.extend, bounds);
        map.fitBounds(bounds);
    });

  function processPoints(geometry, callback, thisArg) {
      if (geometry instanceof google.maps.LatLng) {
          callback.call(thisArg, geometry);
      } else if (geometry instanceof google.maps.Data.Point) {
          callback.call(thisArg, geometry.get());
      } else {
          geometry.getArray().forEach(function (g) {
              processPoints(g, callback, thisArg);
          });
      }
  }
  //----End zoom to route extents---------------------------------------------//

  //----Initialize traffic checkbox-------------------------------------------//
  check();
  
  //----Event Listener--------------------------------------------------------//  
  $("#routes").change(function(feature) {
    deleteObjects();
    //investigate this: uses callback functions
    /*map.data.forEach(function(feature) {
        map.data.remove(feature);
    });*/

    var passRouteInput = $(this).val();
    console.log(passRouteInput);
    trimet(passRouteInput);
    displayGeojson(passRouteInput);
    displayRouteStops(passRouteInput);
  })

  /*
  google.maps.event.addListener(map, 'zoom_changed', function() {
    zoomLevel = map.getZoom();
    if (zoomLevel <= 12) {
      map.data.overrideStyle({visible: true});
      //(dataIn);
    }
  }) */   

/*  $("#mapInput").submit(function(e) {
    var passRouteInput = $("input[name=routeInput]").val();
    console.log(passRouteInput);
    e.preventDefault();
    trimet(passRouteInput);
  })*/
}; 
//----End initialize()--------------------------------------------------------//

google.maps.event.addDomListener(window, 'load', initialize);   



