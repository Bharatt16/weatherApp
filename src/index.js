import "./styles.css";

let baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/location/date-1/date-2?key=MT84LCFDNK2XS7NYCV64E8J6V'

let submitBtn = document.querySelector('.searchDiv>button');
let input = document.querySelector('.searchDiv>input')

submitBtn.addEventListener('click', async () =>{
     let location = input.value.toLowerCase();
     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=MT84LCFDNK2XS7NYCV64E8J6V`);
     const data = await response.json();
     console.log(data);
     let temp = data.days[0].temp;
     let description = data.days[0].description;
     let feelsLike = data.days[0].feelslike;
     let humidity = data.days[0].humidity;
     let wind = data.days[0].windspeed;
     let cloudCover = data.days[0].cloudcover;
     //  console.log(`temp : ${temp} , condition : ${conditions} , feelslike : ${feelsLike} , humdity : ${humidity} , wind : ${wind} , cloud Cover : ${cloudCover}`)
     document.querySelector('.todayTemp').textContent = `${temp}°C`;
     document.querySelector('.tempCondition').textContent = `${description}`;
     
     //for icons
     let iconName = data.days[0].icon;
     let iconPath = `/utilities/${iconName}.png`
     let img = document.createElement('img');
   //   console.log("iconName:", iconName);
   //   console.log("iconPath:", iconPath);
     img.src = iconPath;
     img.alt = 'Weather Icon'
     let iconContainer = document.querySelector('.tempIcon');
     iconContainer.innerHTML = "";
     iconContainer.appendChild(img);
//      img.onerror = function() {
//       console.error('Icon not found:', iconPath);
//   };
     
     document.querySelector('.feelsLikeData').textContent = `${feelsLike}°C`;
     document.querySelector('.humidityData').textContent = `${humidity}%`;
     document.querySelector('.windData').textContent = `${wind}km/h`;
     document.querySelector('.cloudCoverData').textContent = `${cloudCover}%`;


     //weather forecast for other 5 days 


    for(let i = 1 ; i<6 ; i++){
       let tempDay = data.days[i].temp;
       let dateDay = data.days[i].datetime;
       document.querySelector(`.forecasts-${i}>.date`).textContent = `${dateDay}`;
       document.querySelector(`.forecasts-${i}>.forecastTemp`).textContent = `${tempDay}°C`;

      //  for icons 
      let forecastIcon = data.days[i].icon;
      let img = document.createElement('img');
      img.src = `/utilities/${forecastIcon}.png`;
      img.alt = 'forecast Icon';
      let iconContainer = document.querySelector(`.forecasts-${i}>.iconWrapper`);
      iconContainer.innerHTML = "";
      iconContainer.appendChild(img);
    }

    //  //day 1 


    //   //day 2

    //   let tempDayTwo = data.days[2].temp;
    //   let dateDayTwo = data.days[2].datetime;
    //   document.querySelector('.forecasts-2>.date').textContent = `${dateDayTwo}`;
    //   document.querySelector('.forecasts-2>.forecastTemp').textContent = `${tempDayTwo}°C`;
     

    //    //day 3 

    //  let tempDayThree = data.days[3].temp;
    //  let dateDayThree = data.days[3].datetime;
    //  document.querySelector('.forecasts-3>.date').textContent = `${dateDayThree}`;
    //  document.querySelector('.forecasts-3>.forecastTemp').textContent = `${tempDayThree}°C`;

    //   //day 4

    //   let tempDayFour = data.days[4].temp;
    //   let dateDayFour = data.days[4].datetime;
    //   document.querySelector('.forecasts-4>.date').textContent = `${dateDayFour}`;
    //   document.querySelector('.forecasts-4>.forecastTemp').textContent = `${tempDayFour}°C`;

    //    //day 5

    //  let tempDayFive = data.days[5].temp;
    //  let dateDayFive = data.days[5].datetime;
    //  document.querySelector('.forecasts-5>.date').textContent = `${dateDayFive}`;
    //  document.querySelector('.forecasts-5>.forecastTemp').textContent = `${tempDayFive}°C`;
})


