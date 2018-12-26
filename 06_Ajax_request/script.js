const inputField = document.querySelector("input[name=searchTerm]");
const locationList = [];

const getSearchTerm = () => document.querySelector("input[name=searchTerm]").value;

const searchLocation = () => {
  const url = `http://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${getSearchTerm()}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationList.length = 0;
      locationList.push(...data)
    })
}


// write:
// fetch function to search for location
// event listener on inputfield to perform search on key up
