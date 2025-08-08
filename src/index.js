import "./styles.css";

let baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/location/date-1/date-2?key=MT84LCFDNK2XS7NYCV64E8J6V'

let submitBtn = document.querySelector('.searchDiv>button');
let input = document.querySelector('.searchDiv>input');

// Set static SVG icons
document.querySelector('.icon-feels-like').src = '/utilities/feelsLike.svg';
document.querySelector('.icon-humidity').src = '/utilities/humidity.svg';
document.querySelector('.icon-wind').src = '/utilities/wind.svg';
document.querySelector('.icon-cloud').src = '/utilities/cloud.svg';

// **LOADER FUNCTIONS** 
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('show');
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('show');
    }
}

// Enhanced submit button event with loader
submitBtn.addEventListener('click', async () => {
    let location = input.value.trim();
    
    // Validate input
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    // **SHOW LOADER**
    showLoader();
    
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=MT84LCFDNK2XS7NYCV64E8J6V`);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        
        let temp = data.days[0].temp;
        let description = data.days[0].description;
        let feelsLike = data.days[0].feelslike;
        let humidity = data.days[0].humidity;
        let wind = data.days[0].windspeed;
        let cloudCover = data.days[0].cloudcover;
        
        document.querySelector('.todayTemp').textContent = `${temp}°C`;
        document.querySelector('.tempCondition').textContent = `${description}`;
        
        //for icons
        let iconName = data.days[0].icon;
        let iconPath = `/utilities/${iconName}.png`
        let img = document.createElement('img');
        img.src = iconPath;
        img.alt = 'Weather Icon'
        let iconContainer = document.querySelector('.tempIcon');
        iconContainer.innerHTML = "";
        iconContainer.appendChild(img);
        
        document.querySelector('.feelsLikeData').textContent = `${feelsLike}°C`;
        document.querySelector('.humidityData').textContent = `${humidity}%`;
        document.querySelector('.windData').textContent = `${wind}km/h`;
        document.querySelector('.cloudCoverData').textContent = `${cloudCover}%`;

        //weather forecast for other 5 days 
        for(let i = 1; i < 6; i++){
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

        // Background change
        setWeatherBackground(iconName);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the location and try again.');
    } finally {
        // **HIDE LOADER** - This runs regardless of success or failure
        hideLoader();
    }
});

function setWeatherBackground(iconName) {
    const weatherBackgrounds = {
        'clear-day': '/utilities/ClearDay.jpg',
        'clear-night': '/utilities/ClearDay.jpg',
        'cloudy': '/utilities/CloudDay.jpeg',
        'partly-cloudy-day': '/utilities/CloudDay.jpeg',
        'partly-cloudy-night': '/utilities/CloudDay.jpeg',
        'rain': '/utilities/RainyDay.jpg',
        'thunder-rain': '/utilities/RainyDay.jpg',
        'showers-day': '/utilities/RainyDay.jpg',
        'showers-night': '/utilities/RainyDay.jpg',
        'snow': '/utilities/SnowDay.jpg',
        'wind': '/utilities/WindDay.jpg'
    };
    
    const backgroundImage = weatherBackgrounds[iconName] || '/utilities/DefaultWeather.jpg';
    
    // Set background with proper CSS properties
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.transition = 'background-image 0.5s ease';
}

const font = new FontFace('NewFont', 'url(/utilities/fonts/Norse-bold.otf)', {
    weight : '700', // Fixed weight for bold font
    style : 'normal'
});

font.load().then(() => {
    document.fonts.add(font);
    console.log("custom font loaded successfully")
}).catch((error) => {
    console.log("font loading error :", error);
});




function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}


const tempSelect = document.getElementById('temp');

tempSelect.addEventListener('change', () => {
  // Get selected unit
  const isFahrenheit = tempSelect.value === 'fahrenheit';
  
  // Get all temperature elements that need updating
  const elementsToUpdate = [
    { selector: '.todayTemp', type: 'main' },
    { selector: '.feelsLikeData', type: 'main' },
    { selector: '.forecasts-1 > .forecastTemp', type: 'forecast' },
    { selector: '.forecasts-2 > .forecastTemp', type: 'forecast' },
    { selector: '.forecasts-3 > .forecastTemp', type: 'forecast' },
    { selector: '.forecasts-4 > .forecastTemp', type: 'forecast' },
    { selector: '.forecasts-5 > .forecastTemp', type: 'forecast' }
  ];

  elementsToUpdate.forEach(item => {
    const element = document.querySelector(item.selector);
    if (!element) return;

    // Get current displayed value and unit (store as data attribute)
    let currentValue = parseFloat(element.textContent.replace('°C', '').replace('°F', '').trim());
    if (isNaN(currentValue)) return;

    // Convert based on selected unit
    let newValue, newUnit;
    if (isFahrenheit) {
      newValue = celsiusToFahrenheit(currentValue);
      newUnit = '°F';
    } else {
      newValue = fahrenheitToCelsius(currentValue);
      newUnit = '°C';
    }

    // Update display
    element.textContent = `${Math.round(newValue)}${newUnit}`;
  });
});



