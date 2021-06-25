const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url2 = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
     const url='https://api.agromonitoring.com/agro/1.0/weather?lat='+latitude+'&lon='+longitude+'&appid=51cd40cbc1db0101d3f93acbc358a0ce'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
        //  console.log(body)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
      //    console.log(body)
            callback('Unable to find location', undefined)
        } else {
          console.log(body)
    //        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
