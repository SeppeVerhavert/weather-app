let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'imperial';
let searchMethod = "q";

document.getElementById('searchBtn').addEventListener('click', checkInput);

let cityHeader = document.getElementById("cityHeader");
let temperatureElement = document.getElementById("temperature");
let weatherDescriptionHeader = document.getElementById("weatherDiscriptionHeader");
let weatherIcon = document.getElementById("weatherIcon");

let day1 = [];
let day2 = [];
let day3 = [];
let day4 = [];
let day5 = [];
let days = [day1, day2, day3, day4, day5];

function logArrayElements(element, index, array) {
    console.log(element, index, array);
}

days.forEach(logArrayElements);

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            showData(res);
        });
}

function showData(resultFromServer) {
    // console.log(resultFromServer.list[0]);
    // console.log(resultFromServer.list[8]);
    // console.log(resultFromServer.list[16]);
    // console.log(resultFromServer.list[24]);
    // console.log(resultFromServer.list[32]);

    cityHeader.innerHTML = resultFromServer.city.name;
    temperatureElement.innerHTML = Math.floor(resultFromServer.list[0].main.temp) + ' °C';
    let resultDesciption = resultFromServer.list[0].weather[0].description;
    weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);
    weatherIcon = resultFromServer.list[0].weather[0].icon;
    applyIcon();
}

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
}

function applyIcon() {
    if //CLEAR SKY
        (weatherIcon === "01d") {
        weatherIcon.innerHTML = '<i class="fas fa-sun"></i>';
    } else if //FEW CLOUDS
        (weatherIcon === "02d") {
        weatherIcon.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if //SCATTERED OR BROKEN CLOUDS
        (weatherIcon === "03d" || weatherIcon === "04d") {
        weatherIcon.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if //SHOWER RAIN
        (weatherIcon === "09d") {
        weatherIcon.innerHTML = '<i class="fas fa-cloud-sun-rain"></i>';
    } else if //RAIN
        (weatherIcon === "10d") {
        weatherIcon.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if //THUNDERSTORM
        (weatherIcon === "11d") {
        weatherIcon.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if //SNOW
        (weatherIcon === "13d") {
        weatherIcon.innerHTML = '<i class="far fa-snowflake"></i>';
    } else if //FOG 
        (weatherIcon === "50d") {
        weatherIcon.innerHTML = '<i class="fas fa-smog"></i>';
    }
}