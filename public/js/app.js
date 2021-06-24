//console.log('Client side javascript file is loaded')
//const url1="https://maps.googleapis.com/maps/api/geocode/json?24%20Sussex%20Drive%20Ottawa%20ON"
//console.log(url1);

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  response.json().then((data)=>{
    console.log(data)
  })
})

/*
const address='Boston'
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

fetch(url).then((response)=>{
  response.json().then((data)=>{
    console.log(data)
  })
})
*/
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location=search.value
  console.log(location)
  console.log(messageOne)
  console.log(messageTwo)
  messageOne.textContent='Loading ...'
  messageTwo.textContent=''
  fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        e.preventDefault()
        const er=data.error
        console.log(er)
        messageOne.textContent=er
      }else{
        e.preventDefault()
        const loc=data.location
        const forec=data.forecast
      console.log(loc)
      console.log(forec)
      messageOne.textContent=loc
      messageTwo.textContent=forec
    }
    })
  })

})
