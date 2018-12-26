const inputField = document.querySelector('input[name=searchTerm]');
const searchResults = document.querySelector('.search-results');
const locationList = [];

// grab the text entered into search box
const getSearchTerm = () => document.querySelector("input[name=searchTerm]").value;

// search for locations based on the search term
const searchLocation = () => {
  const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${getSearchTerm()}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationList.length = 0;
      locationList.push(...data)
    })
}

// display search results
const displaySearchResults = () => {
  const htmlLocations = locationList.map(location => {
      return `<li>${location.title}</li>`
  }).join('');
  searchResults.innerHTML = htmlLocations;
}



// write:
// event listener on inputfield to perform search on key up
