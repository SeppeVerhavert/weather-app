let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'imperial';
let searchMethod = "q";

let temperatureElement = document.getElementById("temperature");
let cityHeader = document.getElementById("cityHeader");
let weatherDescriptionHeader = document.getElementById("weatherDiscriptionHeader");
let weatherIcon = document.getElementById("documentIconImg");

let Icons = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Fog', 'Snow'];
let iconDiv = document.getElementById("iconDiv");

document.getElementById('searchBtn').addEventListener('click', checkInput);

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
        });
}

function init(resultFromServer) {
    console.log(resultFromServer.list[0]);
    console.log(resultFromServer.list[5]);
    console.log(resultFromServer.list[13]);
    console.log(resultFromServer.list[21]);
    console.log(resultFromServer.list[29]);

    let resultDesciption = resultFromServer.list[0].weather[0].description;
    weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.list[0].main.temp) + ' °C';

    weatherIcon = resultFromServer.list[0].weather[0].icon;
    console.log(weatherIcon);

    cityHeader.innerHTML = resultFromServer.city.name;
    applyIcon();
}

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
}

function applyIcon() {
    if
        (weatherIcon === "01d") { //CLEAR SKY
        iconDiv.innerHTML = '<i class="fas fa-sun"></i>';
    } else if
        (weatherIcon === "02d") { //FEW CLOUDS
        iconDiv.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if
        (weatherIcon === "03d" || weatherIcon === "04d") { //SCATTERED OR BROKEN CLOUDS
        iconDiv.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if
        (weatherIcon === "09d") { //SHOWER RAIN
        iconDiv.innerHTML = '<i class="fas fa-cloud-sun-rain"></i>';
    } else if
        (weatherIcon === "10d") { //RAIN
        iconDiv.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if
        (weatherIcon === "11d") { //THUNDERSTORM
        iconDiv.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if
        (weatherIcon === "13d") { //SNOW
        iconDiv.innerHTML = '<i class="far fa-snowflake"></i>';
    } else if
        (weatherIcon === "50d") { //FOG
        iconDiv.innerHTML = '<i class="fas fa-smog"></i>';
    }
}