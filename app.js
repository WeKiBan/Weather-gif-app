// UI CLASS
class UI {
  constructor() {
    // query selector variables
    this.gif = document.querySelector('.gif');
    this.icon = document.querySelector('.icon');
    this.temp = document.querySelector('.temp');
    this.description = document.querySelector('.description');
    this.searchInput = document.querySelector('.search-input');
    this.searchBtn = document.querySelector('.search-button');
    this.locDis = document.querySelector('.location');
    
  }
  // function to populate ui
  async populateUI(loc) {
    // fetch weather data
    const weather = await api.getWeather(loc);
    // fetch gif url
    const gif = await api.getGif(weather.main);
    // set location
    this.locDis.textContent = weather.location;
    //set gif as picture
    this.gif.src = gif;
    //set gif as background
    document.body.style.background = `url('${gif}')`;
    document.body.style.backgroundSize = 'cover';
    //set weather icon 
    this.icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    // set temperature after conversion to celsius
    this.temp.textContent = Math.round(weather.temp - 273.15);
    // set weather description
    this.description.textContent = weather.description;
  }
}

// API CLASS
class API {
  constructor() {
    // api keys
    this.apiWeatherKey = '2e44188ae7e877bf4fe23dac83d52bae';
    this.giphyApiKey = 'bTcBtm0rGeK9npwOwiyHDiB2nw3AC8DA';
  }
  //function to get the weather
  async getWeather(location) {
    // api address
    const apiAddress = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiWeatherKey}`;

    // fetch weather data from api
    const response = await fetch(apiAddress);

    // convert data to json
    const data = await response.json();
  
    // make weather object
    const weather = {
      location: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      main: data.weather[0].main,
      gif: data.weather[0].gif,
      icon: data.weather[0].icon
    };
    //return weather object
    return weather;
  }
  // function to fetch gif data
  async getGif(description) {
    // api address
    const apiAddress = `https://api.giphy.com/v1/gifs/translate?api_key=${this.giphyApiKey}&s=${description}`;

    // fetch gif data
    const gif = await fetch(apiAddress);
    // convert gif data to json
    const response = await gif.json();

    // return gif url
    return response.data.images.original.url;
  }
}

// init classes
const ui = new UI();
const api = new API();

// EVENT LISTENERS
// on dom load populate display
window.addEventListener('DOMContentLoaded', (e) => {
  ui.populateUI('london');
});

//event listener on search button
ui.searchBtn.addEventListener('click', (e) => {
  // Get location value
  const location = ui.searchInput.value;
  // if value is empty show error
  if (location === '') {
    return alert('Must Input Location');
  } else {
    //else populate the display
    ui.populateUI(location);
    // reset search input value
    ui.searchInput.value = '';
  }
  e.preventDefault();
});
