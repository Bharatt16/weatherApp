import "./styles.css";

// Store your API key securely in production!
let baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// DOM elements
const submitBtn = document.querySelector('.searchDiv>button');
const input = document.querySelector('.searchDiv>input');
const tempSelect = document.getElementById('temp');


document.body.style.backgroundImage = 'url("utilities/MainBg.jpeg")';

// Set static SVG icons (relative paths)
document.querySelector('.icon-feels-like').src = 'utilities/feelsLike.svg';
document.querySelector('.icon-humidity').src = 'utilities/humidity.svg';
document.querySelector('.icon-wind').src = 'utilities/wind.svg';
document.querySelector('.icon-cloud').src = 'utilities/cloud.svg';

// Loader functions
function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('show');
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.remove('show');
}

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

// Universal temperature display update
function updateAllTemperatures() {
  const isFahrenheit = tempSelect.value === 'F';

  document.querySelectorAll('.todayTemp, .feelsLikeData, [class^="forecasts-"] > .forecastTemp').forEach(el => {
    if (!el.dataset.celsius) return;

    const celsius = parseFloat(el.dataset.celsius);
    const displayTemp = isFahrenheit ? Math.round(celsiusToFahrenheit(celsius)) : Math.round(celsius);
    el.textContent = `${displayTemp}${isFahrenheit ? '°F' : '°C'}`;
  });
}

// Temperature unit toggle
tempSelect.addEventListener('change', updateAllTemperatures);

// Weather background switcher (ONLY sets when weather data is fetched)
function setWeatherBackground(iconName) {
  const weatherBackgrounds = {
    'clear-day': 'utilities/ClearDay.jpg',
    'clear-night': 'utilities/ClearDay.jpg',
    'cloudy': 'utilities/CloudDay.jpeg',
    'partly-cloudy-day': 'utilities/CloudDay.jpeg',
    'partly-cloudy-night': 'utilities/CloudDay.jpeg',
    'rain': 'utilities/RainyDay.jpg',
    'thunder-rain': 'utilities/RainyDay.jpg',
    'showers-day': 'utilities/RainyDay.jpg',
    'showers-night': 'utilities/RainyDay.jpg',
    'snow': 'utilities/SnowDay.jpg',
    'wind': 'utilities/WindDay.jpg'
  };

  const backgroundImage = weatherBackgrounds[iconName] || 'utilities/Main.jpeg';
  document.body.style.backgroundImage = `url('${backgroundImage}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.transition = 'background-image 0.5s ease';
}

// Custom font loader
const font = new FontFace('NewFont', 'url(utilities/fonts/Norse-Bold.otf)', {
  weight: '700',
  style: 'normal'
});
font.load().then(() => {
  document.fonts.add(font);
  console.log('Custom font loaded successfully');
}).catch(error => {
  console.log('Font loading error:', error);
});

// Weather API fetch and display
submitBtn.addEventListener('click', async () => {
  let location = input.value.trim();
  if (!location) {
    alert('Please enter a location');
    return;
  }

  showLoader();

  try {
    const response = await fetch(
      `${baseURL}/${location}?unitGroup=metric&key=MT84LCFDNK2XS7NYCV64E8J6V`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Today's weather
    let temp = data.days[0].temp;
    let description = data.days[0].description;
    let feelsLike = data.days[0].feelslike;
    let humidity = data.days[0].humidity;
    let wind = data.days[0].windspeed;
    let cloudCover = data.days[0].cloudcover;

    // Store original Celsius values for conversion
    let todayTempEl = document.querySelector('.todayTemp');
    let feelsLikeEl = document.querySelector('.feelsLikeData');
    todayTempEl.textContent = `${temp}°C`;
    todayTempEl.dataset.celsius = temp;
    feelsLikeEl.textContent = `${feelsLike}°C`;
    feelsLikeEl.dataset.celsius = feelsLike;

    // Weather condition
    document.querySelector('.tempCondition').textContent = description;

    // Weather icon
    let iconName = data.days[0].icon;
    let img = document.createElement('img');
    img.src = `utilities/${iconName}.png`;
    img.alt = 'Weather Icon';
    let iconContainer = document.querySelector('.tempIcon');
    iconContainer.innerHTML = "";
    iconContainer.appendChild(img);

    // Weather stats
    document.querySelector('.humidityData').textContent = `${humidity}%`;
    document.querySelector('.windData').textContent = `${wind}km/h`;
    document.querySelector('.cloudCoverData').textContent = `${cloudCover}%`;

    // 5-day forecast
    for (let i = 1; i < 6; i++) {
      let tempDay = data.days[i].temp;
      let dateDay = data.days[i].datetime;

      // Set forecast temperature
      let forecastTempEl = document.querySelector(`.forecasts-${i} > .forecastTemp`);
      forecastTempEl.textContent = `${tempDay}°C`;
      forecastTempEl.dataset.celsius = tempDay;

      // SET THE DATE
      let dateEl = document.querySelector(`.forecasts-${i} > .date`);
      dateEl.textContent = dateDay;

      // Set forecast icon
      let forecastIcon = data.days[i].icon;
      let img = document.createElement('img');
      img.src = `utilities/${forecastIcon}.png`;
      img.alt = 'Forecast Icon';
      let iconContainer = document.querySelector(`.forecasts-${i} > .iconWrapper`);
      iconContainer.innerHTML = "";
      iconContainer.appendChild(img);
    }

    // Set weather-based background
    setWeatherBackground(iconName);

  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch weather data. Please check the location and try again.');
  } finally {
    hideLoader();
  }
});
