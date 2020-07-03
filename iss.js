const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  const URL = "https://api.ipify.org/?format=json";

  request.get(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

    //console.log("error:", error); // Print the error if one occurred
    //console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const URL = "https://ipvigilante.com/json/";

  request(`${URL}${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (myCoordinates, callback) {
  const URL = `http://api.open-notify.org/iss-pass.json?lat=${myCoordinates.latitude}&lon=${myCoordinates.longitude}`;

  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        `Status Code ${response.statusCode} when fetching ISS Pass times: ${
          JSON.parse(body).reason
        }`,
        null
      );
      return;
    }

    const flyTimes = JSON.parse(body).response;

    callback(null, flyTimes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

http: module.exports = { nextISSTimesForMyLocation };
