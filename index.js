const { nextISSTimesForMyLocation } = require("./iss");

//Converting UTC time to normal standard time
const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(
      `The International Space Station passes your current location at ${datetime} for ${duration} seconds!`
    );
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log("It worked! Returned Coords:", coordinates);
//     fetchISSFlyOverTimes(coordinates, (error, coordinates) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log("It worked! Returned Flyover times:", coordinates);
//     });
//   });
// });
