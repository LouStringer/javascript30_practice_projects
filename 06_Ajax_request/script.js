const inputField = document.querySelector('input[name=searchTerm]');
const searchResults = document.querySelector('.search-results');
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
    // grab searchResults.children and turn into an array - use forEach to attach event listener to each
    // can this be done when generated?
    // select all by class an iterate through
    document.querySelectorAll('.location').forEach(location => {
      location.addEventListener('click', fetchWeather);
    })
  } else {
    searchResults.innerHTML = `<li>no results found</li>`
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

// next stage: click on search result to return five day forecast for that city (pick out temps + icon of weather), make it look good

// use location woeid to fetch weather forecast
const fetchWeather = (event) => {
    const woeid = event.currentTarget.getAttribute('data-woeid');
    const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
}
