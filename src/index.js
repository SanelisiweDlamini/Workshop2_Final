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
  console.log(response.data.daily[1].time);
  let daily = response.data.daily;

  //day1
  let day1 = document.querySelector("#day1day");
  let day = new Date(daily[1].time * 1000);
  day1.innerHTML = day;
  let day1celc = Math.round(daily[1].temperature.day);
  let day1fer = Math.round((day1celc * 9) / 5 + 32);
  let day1temp = document.querySelector("#day1temp");
  day1temp.innerHTML = `${day1celc}°C | ${day1fer}°F`;
  let icon1 = document.querySelector(".icon");
  icon1.setAttribute("src", daily[1].condition.icon_url);

  //day2

  let day2 = document.querySelector("#day2day");
  let day2day = new Date(daily[2].time * 1000);
  day2.innerHTML = day2day;
  let day2celc = Math.round(daily[2].temperature.day);
  let day2fer = Math.round((day2celc * 9) / 5 + 32);
  let day2temp = document.querySelector("#day2temp");
  day2temp.innerHTML = `${day2celc}°C | ${day2fer}°F`;
  let icon2 = document.querySelector(".icon");
  icon2.setAttribute("src", daily[2].condition.icon_url);

  //day 3
  let day3 = document.querySelector("#day3day");
  let day3day = new Date(daily[3].time * 1000);
  day3.innerHTML = day3day;
  let day3celc = Math.round(daily[3].temperature.day);
  let day3fer = Math.round((day3celc * 9) / 5 + 32);
  let day3temp = document.querySelector("#day3temp");
  day3temp.innerHTML = `${day3celc}°C | ${day3fer}°F`;
  let icon3 = document.querySelector(".icon");
  icon3.setAttribute("src", daily[3].condition.icon_url);

  //day4
  let day4 = document.querySelector("#day4day");
  let day4day = new Date(daily[4].time * 1000);
  day4.innerHTML = day4day;
  let day4celc = Math.round(daily[4].temperature.day);
  let day4fer = Math.round((day4celc * 9) / 5 + 32);
  let day4temp = document.querySelector("#day4temp");
  day4temp.innerHTML = `${day4celc}°C | ${day4fer}°F`;
  let icon4 = document.querySelector(".icon");
  icon4.setAttribute("src", daily[4].condition.icon_url);

  /* let forecastElement = document.querySelector("#weather_forecast");
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
  */
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
