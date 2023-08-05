
const ip = document.getElementById('ip');
const latitude = document.getElementById('latitude')
const longtitude = document.getElementById('longtitude')
const city = document.getElementById('city')
const region = document.getElementById('region')
const organisation = document.getElementById('organisation')
const hostname = document.getElementById('hostname');
const iframe = document.querySelector('iframe');
const timeZone = document.getElementById('timeZone');
const dateTime = document.getElementById('dateTime');
const pincode = document.getElementById('pincode');
const numberOfPincode = document.getElementById('numberOfPincode');
const postOffices = document.querySelector(".post-offices");
function myFunction(){
    console.log('Page loaded');
    
   fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then((data)=>{
    console.log(data);
    locationInfo(data.ip) 
    // ipAddress.innerText = data.ip;
    ip.innerText = data.ip
    
  });
}


function locationInfo(ip){
  let url = `http://ip-api.com/json/${ip}`;
  //console.log(`url: ${url}`);
  fetch(url).then(res=> res.json()).then ((data)=> {
    console.log(data);
    latitude.innerText = data.lat;
    iframe.src = `https://maps.google.com/maps?q=${data.lat}, ${data.lon}&z=15&output=embed`
    console.log(data.lat);
    longtitude.innerText = data.lon;
    console.log(data.lon);
    city.innerText = data.city;
    region.innerText = data.region;
    organisation.innerText = data.org;
    timeZone.innerText = data.timezone;
    // datetime based on timezone
    let  datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

    // "3/22/2021, 5:05:51 PM"
    console.log(datetime_str);
    dateTime.innerText =  datetime_str;
    pincode.innerText = data.zip;
    getPostOffice(data.zip)
  })
    
}


function getPostOffice(pin){
  const url = `https://api.postalpincode.in/pincode/${pin}`
  fetch(url).then(res=> res.json()).then(data=>{
    console.log(data);
    numberOfPincode.innerText = data[0].PostOffice.length
  })
}

 