const ipAddress = document.getElementById('ipAddress');
const getStartedButton = document.getElementById('getStartedButton');
const message = document.querySelector('.message')
 
//myFunction will be execute onload page
function myFunction(){
    console.log('Page loaded');
    
   fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then((data)=>{
    console.log(data.ip);
 
    ipAddress.innerText = data.ip;
    getStartedButton.addEventListener('click', ()=>{
      //call this function to fetch locationInfo by using ip
      getInfo(data.ip);
      message.innerText = 'Waiting to redirect...'
      setTimeout(() => {
        window.location.href ='./location.html';
      }, 2000);
    })
  }).catch(err=>{
    console.log(err);
    alert(`https://api.ipify.org?format=json--> this api is not working`);
  });
}

function getInfo(ip){
  // let url = `http://ip-api.com/json/${ip}`;
  let url = `https://ipinfo.io/${ip}/geo`
  fetch(url).then(res=> res.json()).then(data=>{
    console.log(data);
    
    // Convert the array to a JSON string and send it to seasinStorage
    sessionStorage.setItem("ipInfo", JSON.stringify(data))
  })
  .catch(error=>{
    console.log(error);
    alert("https://ipinfo.io/${ip}/geo--> this api is not working")
  })

}
 
