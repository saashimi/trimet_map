; // Defensive semicolon.

/* These functions access the TriMet Live Vehicle Positioning API and Realtime
Stop Arrival API.

//----Main wrapper function---------------------------------------------------//
Hides internal methods and objects from external namespace and allows for 
behavior similar to a plugin library. 
----
E.g. functions are callable in this manner: trimetFuncs.trimetRouteAPI() */ 

var trimetFuncs = (function() {

  //----Publicly-accessible functions------------------------------------------//
  return {

    trimetRouteAPI : function(passRouteInput) {
      /* Accesses the TriMet API for live vehicle location info.
      Output: An array containing objects: lat/long, vehicle ID, timestamp, direction, 
      and verbose route information.
      Input: Route number from user selection dropdown. */
     
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
              var dataPacket = {
                latitude : innerData.latitude,       
                longitude : innerData.longitude,     
                vehicleID : innerData.vehicleID,     
                time : innerData.time,          
                direction : innerData.direction,      
                signMessageLong : innerData.signMessageLong 
              };
              dataOut.push(dataPacket);
              gmapScript.displayMarkers(dataOut);
            } 
          });
        });
      });
    },

    trimetStopAPI : function(passStopRouteServed, passStopInput, passStopName) {
    /* Accesses TriMet arrivals API for realtime vehicle ETAs for that particular
    route and stop. 
    Input data: Route number, Stop ID, descriptive stop name.
    Output data: Array of incoming vehicle IDs,
                 Array of incoming vehicle ETAs in unix time format,
                 Verbose stop name. */

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
        $.each(innerStopData, function(innerIndex, innerValue) {
          if (innerIndex === "route" && innerValue === passStopRouteServed) { 
            var vehicleID = innerStopData.vehicleID;
            vehicleList.push(vehicleID);        
            arrivalTime.push(innerStopData.estimated);         
          }
        });
      });
      gmapScript.infoWindowSetup(vehicleList, arrivalTime, passStopName);
    });
  },

  }; 
  //----End publicly-accessible functions-------------------------------------//

  })();