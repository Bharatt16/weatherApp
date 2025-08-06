import "./styles.css";

let baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/location/date-1/date-2?key=MT84LCFDNK2XS7NYCV64E8J6V'

let submitBtn = document.querySelector('.searchDiv>button');
let input = document.querySelector('.searchDiv>input')

submitBtn.addEventListener('click', async () =>{
     let location = input.value.toLowerCase();
     const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=MT84LCFDNK2XS7NYCV64E8J6V`);
     const data = await response.json();
     console.log(data.days[0]);
     let temp = data.days[0].temp;
     let conditions = data.days[0].conditions;
     let feelsLike = data.days[0].feelslike;
     let humidity = data.days[0].humidity;
     let wind = data.days[0].windspeed;
     console.log(`temp : ${temp} , condition : ${conditions} , feelslike : ${feelsLike} , humdity : ${humidity} , wind : ${wind}`)
})


