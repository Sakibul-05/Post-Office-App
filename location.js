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

 

//get data from seasonStorage
//parse that data
const ipInfo = JSON.parse(sessionStorage.getItem("ipInfo"))
console.log(ipInfo);
// {
//   city: "Kolkata",
//   country: "IN",
//   ip: "103.155.194.48",
//   loc: "22.5626,88.3630",
//   org: "AS140151 Ethereal Business Solutions Private Limited",
//   postal: "700006",
//   readme: "https://ipinfo.io/missingauth",
//   region: "West Bengal",
//   timezone: "Asia/Kolkata"
// }


if(ipInfo){
  
     const lat = ipInfo.loc.split(',')[0]
     const lon = ipInfo.loc.split(',')[1]
      

      //show ip address in UI
      ip.innerText = ipInfo.ip;

        

      latitude.innerText =  lat;
      longtitude.innerText =  lon;
      city.innerText = ipInfo.city;
      region.innerText = ipInfo.region;
      organisation.innerText = ipInfo.org;
      hostname.innerText = ipInfo.readme;
      timeZone.innerText = ipInfo.timezone;
      iframe.src = `https://maps.google.com/maps?q=${lat}, ${lon}&z=15&output=embed`
      
      // Use the timezone from the JSON response to get the time of the user's location
      // datetime based on timezone
      let  datetime_str = new Date().toLocaleString("en-US", { timeZone: `${ipInfo.timezone}` });
      
      // "8/5/2022, 5:05:51 PM"
      console.log(datetime_str);
      dateTime.innerText =  datetime_str;
      pincode.innerText = ipInfo.postal;

      //call this function --> as the function is regular function so i can call it before declearation
      getPostOffice(ipInfo.postal)
}else{
  console.log("Unable to get the data. Please remove ad blocker or try on another broswer");
  alert(`Unable to get the data from server
  Please remove ad blocker from browser`);
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
  .catch(error=>{
    console.log(error);
    alert("https://api.postalpincode.in/pincode/${pin} --> this api doesn't work");
  })
}

//display the UI for each postoffice
function displayPostOffices(postofficesArray){
  //every 1st time calling UI should empty
  postOffices.innerHTML = "";
  postofficesArray.forEach(element => {
    const htmlCode = `<div class="postOffice">
                        <p>Name: <span>${element.Name}</span></p>
                        <p>Branch Type: <span>${element.BranchType}</span></p>
                        <p>Delivery Status: <span>${element.DeliveryStatus}</span></p>
                        <p>District: <span>${element.District}</span></p>
                        <p>Division: <span>${element.Division}</span></p>
                      </div>`;
    //append to the UI                  
    postOffices.innerHTML += htmlCode;                  
  });
} 
 
