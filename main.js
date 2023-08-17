const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const infosElement = document.querySelector("#infos-items");
const timezonePlace = document.querySelector("#time-zone");
const weatherForecastEl = document.querySelector("#weather-forecast");
const currentTempEl = document.querySelector("#current-temp");
const country = document.querySelector(".country")

const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Otu', 'Nov', 'Dec'];
const time = new Date();

getWeatherData()

setInterval(() => {
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    if(hour < 10 && minutes < 10) {
        timeElement.innerHTML = `<p>0${hour}:0${minutes}</p><span id="am-pm">${ampm}</span>`
    } else if(hour < 10 && minutes >= 10) {
        timeElement.innerHTML = `<p>0${hour}:${minutes}</p><span id="am-pm">${ampm}</span>`
    }

    if(hour >= 10 && minutes < 10) {
        timeElement.innerHTML = `<p>${hour}:0${minutes}</p><span id="am-pm">${ampm}</span>`
    } else if(hour >= 10 && minutes >= 10) {
        timeElement.innerHTML = `<p>${hour}:${minutes}</p><span id="am-pm">${ampm}</span>`
    }

    dateElement.innerHTML =  `<p>${days[day]}, ${date} ${months[month]}</p>` 

}, 1000);

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        const apiKey = "e2c86b2b53ac4366886745699b0acc8d"
        // const latitude = success.coords.latitude;
        // const longitude = success.coords.longitude;
        const {latitude, longitude} = success.coords;
        const searchInput = document.querySelector(".search-input")
        const searchBtn = document.querySelector(".search-btn")

        let counter = 0;

        if(counter === 0) {
            const link = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&include=minutely`;
            const linkForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=M`

            fetch(link)
            .then(res => res.json())
            .then(data => {
                console.log(`Dados resgatados pela coordenada (ao carregar a página)`)
                console.log(data)
                showWeatherData(data);
            })

            fetch(linkForecast)
            .then(res => res.json())
            .then(data => {
                console.log(`Dados resgatados pela coordenada (ao carregar a página)`)
                console.log(data)
                showWeatherForecast(data);
            });

            counter++
        }

        if(counter >= 1) {
            searchBtn.addEventListener("click", (e) => {
                e.preventDefault()

                const typedLocation = searchInput.value
                const link = `https://api.weatherbit.io/v2.0/current?city=${typedLocation}&key=${apiKey}&include=minutely`;
                const linkForecast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${typedLocation}&key=${apiKey}&units=M`

                fetch(link)
                .then(res => res.json())
                .then(data => {
                    console.log(`Dados resgatados ao pesquisar uma cidade`)
                    console.log(data)
                    showWeatherData(data);
                })

                fetch(linkForecast)
                .then(res => res.json())
                .then(data => {
                    console.log(`Dados resgatados ao pesquisar uma cidade`)
                    console.log(data)
                    showWeatherForecast(data);
                });

                searchInput.value = ""
            })
        }
    })
}

function showWeatherData(data) {
    const {rh, precip, clouds, sunrise, sunset, wind_spd, temp, timezone, city_name, country_code} = data.data[0];
    const {icon} = data.data[0].weather
    const today = time.getDay();

    timezonePlace.innerText = timezone.replace(/_/i, " ");
    country.innerHTML = `
        <p>${city_name}</p>
        <img src="https://flagsapi.com/${country_code}/flat/64.png">
    `

    infosElement.innerHTML = `
        <div class="infos-items">
            <p>Humidade</p>
            <p>${rh}%</p>
        </div>
        <div class="infos-items">
            <p>Chuva</p>
            <p>${precip}%</p>
        </div>
        <div class="infos-items">
            <p>Nuvens</p>
            <p>${clouds}%</p>
        </div>
        <div class="infos-items">
            <p>Veloc. do vento</p>
            <p>${wind_spd}km/h</p>
        </div>
        <div class="infos-items">
            <p>Nascer do sol</p>
            <p>${sunrise}</p>
        </div>
        <div class="infos-items">
            <p>Por do sol</p>
            <p>${sunset}</p>
        </div>`;

    currentTempEl.innerHTML = `
        <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="weather icon" class="w-icon">
        <div class="selectMaxMin">
            <div class="day"><p>${days[today]}</p></div>
            <div class="temp">Temp / ${temp}&#176;C</div>
            <div class="temp2 selectMax"></div>
            <div class="temp2 selectMin"></div>
        </div>`;
}

function showWeatherForecast(data) {

    const forecastData = data.data;
    let weekDay = 0
    // const maxIndex0 = document.querySelector(".selectMax")
    // const minIndex0 = document.querySelector(".selectMin")
    const minMaxIndex = document.querySelector(".selectMin")

    forecastData.slice(0, 1).forEach((forecast) => {
        let forecastHTML1 = ""

        const {app_max_temp, app_min_temp} = forecast

        forecastHTML1 = `
            <div class="temp2 selectMax">Max / ${app_max_temp}° C</div>
            <div class="temp2 selectMin">Min / ${app_min_temp}° C</div>
        `

        minMaxIndex.innerHTML += forecastHTML1
    });

    if (forecastData.length !== 0) {

        const today = time.getDay();
        
        let forecastHTML2 = ""


        forecastData.slice(1, 7).forEach((forecast) => {
            
            const {app_max_temp, app_min_temp} = forecast;
            const {icon} = forecast.weather;
            
            weekDay++
            
            forecastHTML2 += `
            <div class="weather-forecast-item">
                <div class="day">${days[today + weekDay]}</div>
                <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="weather icon" class="w-icon">
                <div class="temp">Max / ${app_max_temp}&#176;C</div>
                <div class="temp">Min / ${app_min_temp}&#176;C</div>
            </div>
            `;

            
        });

        weatherForecastEl.innerHTML = forecastHTML2
    } 
}
