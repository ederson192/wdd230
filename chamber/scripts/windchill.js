// const tC = 10   ;
// const skmH = 5;

// document.querySelector('.degrees').textContent = tC;
// document.querySelector('.speed').textContent = skmH;

// const tF = tC * (9/5) + 32;
// const smH = skmH / 1.609;

// console.log(tF);
// console.log(smH);


// if (tF <= 50 && smH > 3) {
// const f = 35.74 + 0.6215 * tF - 35.75 * (smH**0.16) + 0.4275 * tF * (smH**0.16)
// document.querySelector('.wind').textContent = f.toFixed(1);
// }
// else {
//   document.querySelector('.wind').textContent = 'N/A';
// }

const apiURL = "https://api.openweathermap.org/data/2.5/weather?&q=Montreal,CA&units=Imperial&appid=f80f411e3bed17aa1c95767af2f79c4b";
let temperature,windSpeed;

fetch(apiURL)
    .then((response) => response.json())
    .then((jsonObject) => {
        const iconSrc = `https://openweathermap.org/img/w/${jsonObject.weather[0].icon}.png`;
        const desc = jsonObject.weather[0].description;
        document.querySelector("#weather-description").textContent = desc;
        document.querySelector("#temperature").textContent = `${jsonObject.main.temp} °F`;
        temperature = jsonObject.main.temp;
        windSpeed = jsonObject.wind.speed;
        document.querySelector("#wind-speed").textContent = windSpeed;
        document.querySelector("#weather-icon").setAttribute("src", iconSrc);
        document.querySelector("#weather-icon").setAttribute("alt", desc);
        
        const calculateWindChill = (t, s) => {
            if( t <= 50 && s >3){
            let windChill = 35.74 + (0.6215 * t) - (35.75 * (s ** 0.16)) + (.4275 * t * (s ** .16));
            return windChill.toFixed(2)
            } else {
                return  "N/A"
            }
        }
        
        let windChill = document.getElementById('wind-chill');
        
        windChill.innerHTML = calculateWindChill(temperature, windSpeed);
    })