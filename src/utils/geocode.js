const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=fd3592e2969b6ceecf828f2feec0795c&query=' + encodeURIComponent(address) + '&limit=1';
    request({ url, json: true }, (err, { body } = {}) => {
        if(err){
            callback('Unable to connect to location service duo to an error', undefined);
        }else if(body.data.length === 0){
            callback('Unable to find location try another one', undefined)
        }else {
            const lon  = body.data[0].longitude;
            const lat = body.data[0].latitude;
            callback(undefined, {latitude: lat, longitude: lon});
        }
    })
};

module.exports = geocode;