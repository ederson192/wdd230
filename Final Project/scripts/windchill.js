const foreURL = "https://api.openweathermap.org/data/2.5/forecast?&q=Carlsbad,US&units=Imperial&appid=f80f411e3bed17aa1c95767af2f79c4b&cnt=25";
const URL = "https://api.openweathermap.org/data/2.5/weather?&q=Carlsbad,US&units=Imperial&appid=f80f411e3bed17aa1c95767af2f79c4b";

const curInfo = document.getElementById("weather_current_info");
const curIcon = document.getElementById("weather_current_icon");
const foreCard = document.getElementById("forecastCard");


// Current Weather

const weather = await apiReq(URL);

curInfo.innerHTML = `
<span>${weather.weather[0].description}</span>
<p>${Math.floor(weather.main.temp)}°</p>
<span>Humidity: ${weather.main.humidity}</span>
`
curIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].description}">`


// Forecast Weather
const forecast = await apiReq(foreURL);

const foreData = getThreeDays(forecast);

foreData.forEach( data => {
  const date = (new Date(data.dt * 1000)).toLocaleString('default', {day: 'numeric', month: 'short', year: '2-digit'});
  foreCard.innerHTML += `
<div>
<span>${date}</span>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
<span>${Math.floor(data.main.temp)}°F</span>
</div>
  `
})


async function apiReq(URL) {
  return fetch(URL)
          .then(response => response.json())
}

function getThreeDays(forecast) {
  let day = (new Date()).getDate();

  const dates = forecast.list.filter( fore => {
    const date = (new Date(fore.dt * 1000)).getDate();
    if (date !== day) {
      day++;
      return fore
    }
  });


  return dates
}