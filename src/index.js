let x = new Date();
let todayDate = x.getDate();
let month = x.getMonth();
let year = x.getFullYear();
let hour = x.getHours();
let minutes = x.getMinutes();
let updatedMins = "";
if (minutes < 10) {
  updatedMins = `0${minutes}`;
} else {
  updatedMins = minutes;
}
if (hour > 16) {
  document.getElementById("box").style.backgroundColor = "dimgray";
  document.getElementById("box").style.color = "white";
}
let todaysDate = document.querySelector(".date");
todaysDate.innerHTML = `Updated: ${todayDate}/${month}/${year} (${hour}:${updatedMins})`;
let search = document.querySelector("#searchEngine");
search.addEventListener("submit", check);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  /*  let url = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;*/
  console.log(url);
  axios.get(url).then(displayForecast);
  //console.log(response.data);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather_forecast");
  forecastElement.innerHTML = `
  <div class="col-2" id="1day">
          Mon
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
        <div class="col-2" id="2day">
          Tue
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
        <div class="col-2" id="3day">
          Wed
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
        <div class="col-2" id="4day">
          Thur
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
        <div class="col-2" id="5day">
          Fri
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
        <div class="col-2" id="5day">
          Sat
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            id="icon"
            alt="Clear"
            width="50px"
          />
          13°C|56°F
        </div>
  
  `;
}

function check(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("h2");
  searchedCity.innerHTML =
    input.value.charAt(0).toUpperCase(0) + input.value.slice(1);

  let apiKey = "095adb74c2b19077ce4ca65f855199f0";
  let searchCity = input.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(getCurrent);
}

function getCurrent(response) {
  let celcWeather = response.data.main.temp;
  let ferWeather = (celcWeather * 9) / 5 + 32;
  let currentTemp = document.querySelector(".weather");
  currentTemp.innerHTML = `${Math.round(
    response.data.main.temp
  )}°C | ${Math.round(ferWeather)}°F`;
  let humidity = response.data.main.humidity;
  let windspeed = response.data.wind.speed;
  let descrip = response.data.weather[0].description;
  let updatedDesc = descrip.charAt(0).toUpperCase(0) + descrip.slice(1);
  let displayedDescr = document.querySelector(".descr");
  displayedDescr.innerHTML = updatedDesc;
  let displayedHumidity = document.querySelector("#humid");
  displayedHumidity.innerHTML = `Humidity: ${humidity}%`;
  let displayedWindspeed = document.querySelector("#windspeed");
  displayedWindspeed.innerHTML = `Wind-speed: ${windspeed}km/h`;
  let iconID = response.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconID}@2x.png`
  );
  icon.setAttribute("alt", updatedDesc);
  getForecast(response.data.coord);
}
