const inputField = document.querySelector('input[name=searchTerm]');
const searchResults = document.querySelector('#search-results');
const locationHeading = document.querySelector('#forecast-location');
const dailyForecastDisplay = document.querySelector('#daily-forecast');
// const locationList = [];
// let locationData = {};

// grab the text entered into search box
const getSearchTerm = () => document.querySelector('input[name=searchTerm]').value;

// display search results in UI
const displaySearchResults = (data) => {
  if (data.length >=1) {
    const htmlLocations = data.map(location => {
        return `<li class='location' data-woeid=${location.woeid}>${location.title}</li>`
    }).join('');
    searchResults.innerHTML = htmlLocations;
    document.querySelectorAll('.location').forEach(location => {
      location.addEventListener('click', fetchWeather);
    });
  } else {
    searchResults.innerHTML = `<li>no results found</li>`;
  }
}

// search for locations based on the search term
const searchLocation = () => {
  const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${getSearchTerm()}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displaySearchResults(data);
      // locationData = data;
    })
}

// event listener to run search and display results when text entered in box
inputField.addEventListener('input', () => {
  inputField.value.length > 1 ? searchLocation() : searchResults.innerHTML = '';
});

// fetch weather forecast using woeid of clicked on function
const fetchWeather = (event) => {
    const woeid = event.currentTarget.getAttribute('data-woeid');
    const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {console.log(data); displayForecast(data)})
}

// to include: day | min temp | max temp | weather + icon | wind speed
const displayForecast = data => {
  const formatForecastDetails = data.consolidated_weather.map(day => {
    return {
      dayNumber: data.consolidated_weather.indexOf(day) + 1,
      weather: day.weather_state_name.toLowerCase(),
      minTemp: Math.round(day.min_temp),
      maxTemp: Math.round(day.max_temp),
      predictedTemp: Math.round(day.the_temp),
      windSpeed: Math.round(day.wind_speed)
    };
  });
  updateLocationHeading(data);
  generateForecastHtml(formatForecastDetails);
}

const updateLocationHeading = (data) => {
  locationHeading.innerHTML = `weather for ${data.title}`;
}

const generateForecastHtml = forecasts => {
  const htmlForecasts = forecasts.map(day => {
      return `<div class="day day${day.dayNumber}">
                <p>day ${day.dayNumber}</p>
                <p>weather conditions: ${day.weather}</p>
                <p>temperature: ${day.predictedTemp}°c</p>
                <p>range: ${day.minTemp}°c to ${day.maxTemp}°c</p>
                <p>wind speed: ${day.windSpeed}</p>
              </div>`
  }).join('');
  dailyForecastDisplay.innerHTML = htmlForecasts;
}
