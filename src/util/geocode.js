const request = require('request')

const geocode = (address, callback) => {
  const key='pk.eyJ1IjoicGhpbGlwcGVjdWF6IiwiYSI6ImNrcWM4MXNhaTB1NnEyb292MTE0cWcydGsifQ.ic_-sksCTSQk1PTaT3M3Lw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+key+'&limit=1'
  //  const url1="https://maps.googleapis.com/maps/api/geocode/json?Sussex%20Drive%20Ottawa%20ON"
  //  const url2="https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key="
  //  const url2="https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key=AIzaSyCnUx1sH7KScEXqyaF5eg2oigAic7LmDl4"
//    const apikey="AIzaSyCnUx1sH7KScEXqyaF5eg2oigAic7LmDl4"

    request({ url, json: true }, (error,  body ) => {
  //    console.log('body: '+body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {

                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
