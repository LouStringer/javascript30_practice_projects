// get all DOM elements
const searchSection = document.querySelector('#search');
const inputField = document.querySelector('input[name=searchTerm]');
const searchResults = document.querySelector('#search-results');
const forecastSection = document.querySelector('#forecast');
const locationHeading = document.querySelector('#forecast-location');
const dailyForecastDisplay = document.querySelector('#daily-forecasts');
const resetButton = document.querySelector('#reset');

// search for and display locations based on the search term
const searchLocation = () => {
  const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${inputField.value}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {generateSearchHtml(data)})
    .catch(error => searchResults.innerHTML = `<p>oh no! something messed up, please try againn</p>`)
}

// event listener to run search and display results when text entered in input box
inputField.addEventListener('input', () => {
  inputField.value.length > 1 ? searchLocation() : searchResults.innerHTML = '';
});

// update HTML to show search results in UI and attach event listeners on results
const generateSearchHtml = (data) => {
  if (data.length >=1) {
    const htmlLocations = data.map(location => {
        return `<button class='location' data-woeid=${location.woeid}>${location.title}</button>`
    }).join('');
    searchResults.innerHTML = htmlLocations;
    document.querySelectorAll('.location').forEach(location => {
      location.addEventListener('click', fetchWeather);
    });
  } else {
    searchResults.innerHTML = `<p>no results found</p>`;
  }
}

// fetch weather forecast using woeid of search result location clicked on
const fetchWeather = (event) => {
    inputField.value = 'fetching weather!';
    searchResults.innerHTML = '';
    const woeid = event.currentTarget.getAttribute('data-woeid');
    const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;
    fetch(url)
      .then(response => response.json())
      .then(data => displayForecast(data))
      .catch(error => dailyForecastDisplay.innerHTML = `<p>oh no! something messed up, please try again</p>`)
}

// format and display the daily forecasts
const updateLocationHeading = data => {
  locationHeading.innerHTML = `weather for ${data.title}`;
}

const generateForecastHtml = data => {
  const htmlForecasts = data.consolidated_weather.map(day => {
      return `<div class="day">
                <div class="weather-icon">
                  <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" alt="weather conditions icon"/>
                </div>
                <div class="weather-info">
                  <p class="day-number">day ${data.consolidated_weather.indexOf(day) + 1}</p>
                  <p>${day.weather_state_name.toLowerCase()}</p>
                  <p>${Math.round(day.the_temp)}°c</p>
                  <p>(${Math.round(day.min_temp)}°c to ${Math.round(day.max_temp)}°c)</p>
                  <p>wind ${Math.round(day.wind_speed)}mph</p>
                </div>
              </div>`
  }).join('');
  dailyForecastDisplay.innerHTML = htmlForecasts;
};

const displayForecast = data => {
  updateLocationHeading(data);
  generateForecastHtml(data);
  resetButton.addEventListener('click', reset);
  searchSection.classList.add('hidden');
  forecastSection.classList.remove('hidden')
}

// reset & search again
const reset = () => {
  inputField.value = '';
  searchResults.innerHTML = '';
  locationHeading.innerHTML = '';
  dailyForecastDisplay.innerHTML = '';
  searchSection.classList.remove('hidden');
  forecastSection.classList.add('hidden')
}
