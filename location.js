
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
const searchInput = document.getElementById('searchInput');


// function myFunction(){
//     console.log('Page loaded');
//     console.log(JSON.parse(sessionStorage.getItem('locationInfo')));
//    //fetch ip address 
//    fetch('https://api.ipify.org?format=json')
//   .then(response => response.json())
//   .then((data)=>{
//     console.log("id data: ",data);
  
//     //After fetching ip address then this getLocationInfo function called
//     getLocationInfo(data.ip) 
//   });
// // }


// function getLocationInfo(ip){
//   let url = `http://ip-api.com/json/${ip}`;
//   // const url = `https://api.ipapi.is/?q=${ip}`;
//   //console.log(`url: ${url}`);
//   fetch(url).then(res=> res.json()).then ((data)=> {
//     console.log(data);
     
//     latitude.innerText = data.lat;
//     iframe.src = `https://maps.google.com/maps?q=${data.lat}, ${data.lon}&z=15&output=embed`
     
//     console.log(data.lat);
//     longtitude.innerText = data.lon;
//     console.log(data.lon);
//     city.innerText = data.city;
//     region.innerText = data.region;
//     organisation.innerText = data.org;
//     timeZone.innerText = data.timezone;
//     // datetime based on timezone
//     let  datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

//     // "3/22/2021, 5:05:51 PM"
//     console.log(datetime_str);
//     dateTime.innerText =  datetime_str;
//     pincode.innerText = data.zip;
//     getPostOffice(data.zip)
//   })
    
// }


// function getPostOffice(pin){
//   const url = `https://api.postalpincode.in/pincode/${pin}`
//   fetch(url).then(res=> res.json()).then(data=>{
//     console.log(data);
//     const postOfficeArray = data[0].PostOffice;
//     numberOfPincode.innerText = postOfficeArray.length
//     displayPostOffices(postOfficeArray);
//     searchInput.addEventListener('input', (event)=>{
//       event.preventDefault()
//       const searchTerm = searchInput.value.toLowerCase();
//       //filtering postoffices by using name
//       console.log(searchTerm);
//       // console.log(postOfficeArray);
//       const filteredPostOffices = postOfficeArray.filter((element)=>{
//         return element.Name.toLowerCase().includes(searchTerm) 
//       })
//       console.log(filteredPostOffices);
//       displayPostOffices(filteredPostOffices);
//     })
     
//   })
// }

// function displayPostOffices(postofficesArray){
//   postOffices.innerHTML = "";
//   postofficesArray.forEach(element => {
//     const htmlCode = `<div class="postOffice">
//                         <p>Name: <span>${element.Name}</span></p>
//                         <p>Branch Type: <span>${element.BranchType}</span></p>
//                         <p>Delivery Status: <span>${element.DeliveryStatus}</span></p>
//                         <p>District: <span>${element.District}</span></p>
//                         <p>Division: <span>${element.Division}</span></p>
//                       </div>`;
//     postOffices.innerHTML += htmlCode;                  
//   });
// } 

 


//get data from seasonStorage
//parse that data
const dataArray = JSON.parse(sessionStorage.getItem("dataArray"))
 
if(Array.isArray(dataArray)){
  
      //1st one stored into locationInfo
      let locationInfo = dataArray[0];
      //2nd one stored into ipAddress
      let ipAddress = dataArray[1];
      

      //show ip address in UI
      ip.innerText = ipAddress;

        

      latitude.innerText = locationInfo.lat;
      longtitude.innerText = locationInfo.lon;
      city.innerText = locationInfo.city;
      region.innerText = locationInfo.region;
      organisation.innerText = locationInfo.org;
      timeZone.innerText = locationInfo.timezone;
      iframe.src = `https://maps.google.com/maps?q=${locationInfo.lat}, ${locationInfo.lon}&z=15&output=embed`
      
      // Use the timezone from the JSON response to get the time of the user's location
      // datetime based on timezone
      let  datetime_str = new Date().toLocaleString("en-US", { timeZone: `${locationInfo.timezone}` });

      // "3/22/2021, 5:05:51 PM"
      console.log(datetime_str);
      dateTime.innerText =  datetime_str;
      pincode.innerText = locationInfo.zip;

      //call this function --> as the function is regular function so i can call it before declearation
      getPostOffice(locationInfo.zip)
}else{
  console.log("Unable to get the data");
  alert(`Unable to get the data from server`);
}



//define getPostOffice fn over here
//function will fetch data based on pin
function getPostOffice(pin){
  const url = `https://api.postalpincode.in/pincode/${pin}`
  fetch(url).then(res=> res.json()).then(data=>{
    console.log(data);
    const postOfficeArray = data[0].PostOffice;
    //show number of postoffice in the UI
    numberOfPincode.innerText = postOfficeArray.length
    //calling function for display post offices in the UI
    displayPostOffices(postOfficeArray);

    //Add event listener to searchInput for filteration
    searchInput.addEventListener('input', (event)=>{
      
      const searchTerm = searchInput.value.toLowerCase();
      console.log(searchTerm);
      //filtering postoffices by using name
      const filteredPostOffices = postOfficeArray.filter((element)=>{
        return element.Name.toLowerCase().includes(searchTerm) 
      })
      console.log(filteredPostOffices); 
      //After filteration show the filtered post offices into the UI
      displayPostOffices(filteredPostOffices);
    })
     
  })
}

function displayPostOffices(postofficesArray){
  postOffices.innerHTML = "";
  postofficesArray.forEach(element => {
    const htmlCode = `<div class="postOffice">
                        <p>Name: <span>${element.Name}</span></p>
                        <p>Branch Type: <span>${element.BranchType}</span></p>
                        <p>Delivery Status: <span>${element.DeliveryStatus}</span></p>
                        <p>District: <span>${element.District}</span></p>
                        <p>Division: <span>${element.Division}</span></p>
                      </div>`;
    postOffices.innerHTML += htmlCode;                  
  });
} 

 