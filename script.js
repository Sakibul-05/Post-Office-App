/* Add "https://api.ipify.org?format=json" statement
this will communicate with the ipify servers in
order to retrieve the IP address $.getJSON will
load JSON-encoded data from the server using a
GET HTTP request */
           
// const body = document.getElementsByTagName("body")[0];
const ipAddress = document.getElementById('ipAddress')
// body.addEventListener("load", (event)=>{
//     event.preventDefault()
   
// })


function myFunction(){
    console.log('Page loaded');
    
   fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then((data)=>{
    console.log(data.ip);
    locationInfo(data.ip) 
    ipAddress.innerText = data.ip;
    
  });
}


function locationInfo(ip){
  let url = `http://ip-api.com/json/${ip}`;
  //console.log(`url: ${url}`);
  fetch(url).then(res=> res.json()).then ((data)=> {
    console.log(data);
  
    getPostOffice(data.zip)
  })
    
}


function getPostOffice(pin){
  const url = `https://api.postalpincode.in/pincode/${pin}`
  fetch(url).then(res=> res.json()).then(data=>{
    console.log(data);
  })
}