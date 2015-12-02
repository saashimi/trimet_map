//----Global vars for google maps traffic layers to work----------------------//
var map = null;    
var trafficLayer=new google.maps.TrafficLayer();
//----------------------------------------------------------------------------//

function trimet(passRouteInput) {
  //Accesses the TriMet API for live vehicle location info.
  //Input:APPID from hidden file.
  //Output: A coordinate pair in an array. E.g. [45.5200, -122.6819]
 
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
  var dataOut = []; // This is a list of coordinates.
  var innerData;
  $.post(url + APPID, function(data) {
  data = data.resultSet.vehicle;
    $.each(data, function(index, value) { // Key into the inner JSON
      innerData = data[index];
      $.each(innerData, function(index1, value1) {
        if (index1 === "routeNumber" && value1 === Number(passRouteInput)) { 
          var coord = [innerData.latitude, innerData.longitude];
          dataOut.push(coord);
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

  var markerData = dataIn;
  // refactor for JQuery later
  for( i = 0; i < markerData.length; i++ ) {
    var position = new google.maps.LatLng(markerData[i][0], markerData[i][1]);
    //bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
    });
  //Zooms in on marker upon click.
  google.maps.event.addListener(marker, 'click', function() {
  map.panTo(this.getPosition());
  map.setZoom(15);
  });  
  }
}

function displayGeojson(dataIn) {
  var geojsonURL1 = 'http://localhost:9000/routeserver/';
  var geojsonURL2 = 'TMRoutes?=format=json&rte=';
  var geojsonRteURL = dataIn;
  map.data.setStyle({
    strokeColor: 'orange',
    strokeOpacity: 0.5,
  })

  map.data.loadGeoJson(geojsonURL1 + geojsonURL2 + geojsonRteURL);
}//end displayGeojson

function initialize(dataIn) {
  // The main google maps initialization function.
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
          //{visibility : "on"}
      ]
    }
  ];
  // Sets the desaturated style (defined above) to desaturated.
  var mapProp = {
    center:new google.maps.LatLng(45.5200,-122.6819),
    zoom:12,
    mapTypeControlOptions: {  
      mapTypeIds: [] // kept as an empty list because we want to disallow users
                     // to select other options. Maintains site "branding."
    }
  };
  
  map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  var mapType=new google.maps.StyledMapType(styles, {name : 'Desaturated'});
  map.mapTypes.set('desaturated', mapType);
  map.setMapTypeId('desaturated');

  check();
  
//----Event Listener----------------------------------------------------------//  
  $("#routes").change(function() {
    var passRouteInput = $(this).val();
    console.log(passRouteInput);
    trimet(passRouteInput);
    displayGeojson(passRouteInput);
  })

/*  $("#mapInput").submit(function(e) {
    var passRouteInput = $("input[name=routeInput]").val();
    console.log(passRouteInput);
    e.preventDefault();
    trimet(passRouteInput);
  })*/
}; // End initialize()

google.maps.event.addDomListener(window, 'load', initialize);   



