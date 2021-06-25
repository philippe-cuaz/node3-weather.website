const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')
//const {Client} = require("@googlemaps/google-maps-services-js");

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//const client = new Client({});



//const url1="https://maps.googleapis.com/maps/api/geocode/json?24%20Sussex%20Drive%20Ottawa%20ON"
//console.log(url1);

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  res.render('index',{
    title:'Weather',
    name: 'Andrew Mead'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title: 'About me',
    name: 'Andrew Mead',
    abouttext: 'the about text'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title: 'Help Page',
    name: 'Andrew Mead',
    helptext: 'the help text'

  })
})

app.get('/weather',(req,res)=>{
  const longitude=req.query.longitude
  const latitude=req.query.latitude
  const location=req.query.location
  const address=req.query.address
  const coordinates=latitude&&longitude&&location&&address
  if(coordinates){
    //return
    res.send({
      error:'You must provide coordinates longitude & latitude & location & address terms'
    })
  }
  //  console.log('latitude: '+latitude+' longitude: '+longitude+' location: '+location+' address: '+address)

  //geocode()
  //   geocode(address, (error,  address ) => {
  //  })

    geocode(address, (error,  {latitude, longitude, location }) => {
        if (error) {
             console.log(error)
             return res.send({error})
        }
const body=null;
        forecast(latitude, longitude, (error, {body}) => {
            if (error) {
                console.log("error: "+error)
                return res.send({error})
            }

            console.log("location: "+location)
            console.log("body2: "+body)
        })
    })

    res.send({
      forecast:body.weather[0].main,
     location,
     address: req.query.address

    })

})



app.get('/products',(req,res)=>{
if(!req.query.search){
  return res.send({
    error:'You must provide a search term'
  })
}

  console.log("search: "+req.query.search)
  res.send({
    products: []
  })
})
app.get('/help/*',(req,res)=>{
    //  res.send(' article not found')
    res.render('notfound',{
      helptext: 'article not found',
      name: 'Andrew Mead'
    })
   })


app.get('*',(req,res)=>{
   //res.send('My 404 page')
   res.render('404',{
     helptext: '404',
     name: 'Andrew Mead'
   })
})

app.listen(port,()=>{
  console.log('Server is up on port '+port)
})
