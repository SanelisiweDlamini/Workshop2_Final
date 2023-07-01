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

function check(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("h2");
  searchedCity.innerHTML = input.value;

  let apiKey = "095adb74c2b19077ce4ca65f855199f0";
  let searchCity = input.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(getCurrent);
}

function getCurrent(response) {
  console.log(response.data);
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
  displayedWindspeed.innerHTML = `Wind-speed: ${windspeed}%`;
}
