const inputField = document.querySelector('input[name=searchTerm]');
const searchResults = document.querySelector('#search-results');
const locationHeading = document.querySelector('#forecast-location');
const dailyForecastDisplay = document.querySelector('#daily-forecasts');

// grab the text entered into search box
const getSearchTerm = input => input.value;

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
    searchResults.innerHTML = `<li>no results found</li>`;
  }
}

// search for and display locations based on the search term
const searchLocation = () => {
  const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${getSearchTerm(inputField)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {generateSearchHtml(data)})
    .catch(error => console.log('failure in fetching matching locations'))
}

// event listener to run search and display results when text entered in input box
inputField.addEventListener('input', () => {
  inputField.value.length > 1 ? searchLocation() : searchResults.innerHTML = '';
});

// fetch weather forecast using woeid of search result location clicked on
const fetchWeather = (event) => {
    searchResults.innerHTML = '';
    const woeid = event.currentTarget.getAttribute('data-woeid');
    const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {console.log(data); displayForecast(data)})
      .catch(error => console.log('failure in fetching forecasts'))
}

// format and display the daily forecasts
const updateLocationHeading = (data) => {
  locationHeading.innerHTML = `weather for ${data.title}`;
}

const generateForecastHtml = forecasts => {
  const htmlForecasts = forecasts.map(day => {
      return `<div class="day day${day.dayNumber}">
                <div class="weather-icon">
                  <img src="https://www.metaweather.com/static/img/weather/${day.weatherCode}.svg" alt="weather conditions icon"/>
                </div>
                <div class="weather-info">
                  <p>day ${day.dayNumber}</p>
                  <p>${day.weather}</p>
                  <p>${day.predictedTemp}°c</p>
                  <p>(${day.minTemp}°c to ${day.maxTemp}°c)</p>
                  <p>wind ${day.windSpeed}mph</p>
                </div>
              </div>`
  }).join('');
  dailyForecastDisplay.innerHTML = htmlForecasts;
}

const displayForecast = data => {
  const formatForecastDetails = data.consolidated_weather.map(day => {
    return {
      dayNumber: data.consolidated_weather.indexOf(day) + 1,
      weather: day.weather_state_name.toLowerCase(),
      weatherCode: day.weather_state_abbr,
      minTemp: Math.round(day.min_temp),
      maxTemp: Math.round(day.max_temp),
      predictedTemp: Math.round(day.the_temp),
      windSpeed: Math.round(day.wind_speed)
    };
  });
  updateLocationHeading(data);
  generateForecastHtml(formatForecastDetails);
}
