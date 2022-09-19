const request = require('request');

const forecast  = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +'&units=metric&appid=3a25707fd99906b92241742955c2c420';
    request({ url, json: true }, (err, { body })  => {
        if(err){
            callback('Unable to connect to weather service duo to an error', undefined);
        }else if(body.cod == 400){
            callback('Unable to find a location', undefined);
        }else{
            const temp = body.main.temp;
            const description = body.weather[0].description;
            callback(undefined, "it's currently " + Math.floor(temp) + " degree, with " + description + ", also there's a " + body.clouds.all + " chance of rain.");
        }
    })
};

module.exports = forecast;