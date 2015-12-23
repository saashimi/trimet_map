//----Functions---------------------------------------------------------------//
function trimetRouteAPI(passRouteInput) {
  //Accesses the TriMet API for live vehicle location info.
  //Output: An array containing lat/long, vehicle ID, timestamp, direction, 
  //and verbose route information.
  //Input: Route number from user selection dropdown.
 
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID=" 
  var dataOut = [];
  var innerData;
  $.post(url + APPID, function(data) {
  data = data.resultSet.vehicle;
    $.each(data, function(outerIndex, outerValue) { // Key into the inner JSON
      innerData = data[outerIndex];
      $.each(innerData, function(innerIndex, innerValue) {
        if (innerIndex === "routeNumber" && 
            innerValue === Number(passRouteInput)) { 
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

function trimetStopAPI(passStopRouteServed, passStopInput, passStopName) {
  //Accesses TriMet arrivals API for realtime vehicle ETAs for that particular
  //route and stop. 
  //Input data: Route number, Stop ID, descriptive stop name.
  //Output data: Array of incoming vehicle IDs,
  //             Array of incoming vehicle ETAs in unix time format,
  //             Verbose stop name.

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
          arrivalTime.push(innerStopData.estimated);         
        }
      });
    });
  infoWindowSetup(vehicleList, arrivalTime, passStopName);
  });
};

function infoWindowSetup(passVehicles, passArrivals, passStopName) {
    //Sets up the info windows for selected route stops. 
    //Inputs: array of incoming vehicles,
    //        array of incoming arrival times,
    //        verbose stop name
    //Output: infowindow content passed to gmapScript.js

    var formattedETA = [];
    //Converts unix time format to HH:MM format.
    
    $.each(passArrivals, function(index, value) {
      var date = new Date(value);
      if (date.getHours() > 12) { 
        var hours = date.getHours() - 12;
      } else { 
        var hours = date.getHours();
      }
      var minutes = "0" + date.getMinutes();
      var ETA = hours + ":" + minutes.substr(-2);
      formattedETA.push(ETA);
    });
    
    // Formats and populates the info window. 
    var infoContent = (
      "<h5><p> This is stop: " + stopID + "</br>"
      + "<h4><p>" + passStopName + "</br></h4>"
      + "<h6><p>Upcoming Vehicles (ID#): " + passVehicles + "</br></h6>"
      + "<h6><p>Estimated arrival times: " + formattedETA + "</br></h6>"
    )
    infowindow.setContent(infoContent);
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-10)});
    infowindow.open(map);
};