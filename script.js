
const ipAddress = document.getElementById('ipAddress');
const getStartedButton = document.getElementById('getStartedButton');
 
//myFunction will be execute onload page
function myFunction(){
    console.log('Page loaded');
    
   fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then((data)=>{
    console.log(data.ip);
 
    ipAddress.innerText = data.ip;
    localStorage.setItem("ipAddress", data.ip)
    //call this function to fetch locationInfo by using ip
    getInfo(data.ip);
  }).catch(err=>{
    alert(`https://api.ipify.org?format=json--> this api is not working`);
  });
}

function getInfo(ip){
  let url = `http://ip-api.com/json/${ip}`;
  fetch(url).then(res=> res.json()).then(data=>{
    console.log(data);
    
    const data1 = data;
    const data2 = ip;
    // Combine the data into an array
    const dataArray = [data1, data2];
    // Convert the array to a JSON string and send it to seasinStorage
    sessionStorage.setItem("dataArray", JSON.stringify(dataArray))
  }).catch(error=>{
    alert("http://ip-api.com/json/${ip}--> this api is not working")
  })
}
 

 