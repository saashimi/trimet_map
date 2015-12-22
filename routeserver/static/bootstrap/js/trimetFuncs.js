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
            innerData.time,           //index = 3
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

function trimetStop(passStopRouteServed, passStopInput, passStopName) {
  var url = "https://developer.trimet.org/ws/v2/arrivals?locIDs=";
  var locID = passStopInput;
  var urlTrailing =  "&minutes&appID=";
  var innerStopData;
  var vehicleList = [];
  var arrivalTime = [];
  $.post(url + locID + urlTrailing + APPID, function(data) {
  data = data.resultSet.arrival;
    $.each(data, function(index, value) {
      innerStopData = data[index]
      $.each(innerStopData, function(index1, value1) {
        if (index1 === "route" && value1 === passStopRouteServed) { 
          var vehicleID = innerStopData.vehicleID;
          vehicleList.push(vehicleID);

            var date = new Date(innerStopData.estimated);
            if (date.getHours() > 12) { 
              var hours = date.getHours() - 12;
            } else { 
              var hours = date.getHours();
            };
            var minutes = "0" + date.getMinutes();
            var ETA = hours + ":" + minutes.substr(-2);
          
          arrivalTime.push(ETA);         
        var infoContent = ("<h5><p> This is stop: " + stopID + "</br>"
          + "<h4><p>" + passStopName + "</br></h4>"
          + "<h6><p>Upcoming Vehicles (ID#): " + vehicleList + "</br></h6>"
          + "<h6><p>Estimated arrival times: " + arrivalTime + "</br></h6>"
          )
        infowindow.setContent(infoContent);
        }
      })
    })
  })
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-10)});
      infowindow.open(map);
};