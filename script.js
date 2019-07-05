// VARIABLES

document.getElementById('searchBtn').addEventListener('click', checkInput);
let error = document.getElementsByClassName('errorMessages')[0];
let dataContainer = document.getElementById("weatherContainer");

let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'metric';
let searchMethod = "q";

let options = { weekday: 'long' };
let j = 0;
let k = 0;
let Icons;

let week = [];
let dayOne = [];
let dayTwo = [];
let dayThree = [];
let dayFour = [];
let dayFive = [];

// CHECK IF TEXT IS IN INPUT FIELD

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;

    if (searchTerm) {
        error.style.display = "none";
        dataContainer.style.display = "flex";
        searchWeather(searchTerm);
    }

    if (!searchTerm) {
        error.style.display = "block";
        dataContainer.style.display = "none";
    }
}

// GET DATA FROM THE API

function searchWeather(searchTerm) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            showData(res);
        });
}

// APPLY DATA TO DAYS

function showData(serverData) {

    for (j = 0; j != 5; j += 1) {

        updateK();
        applyData(serverData);

        for (i = 0; i < serverData.list.length; i += 8) {
            week.push(serverData.list[i].main);
            pushDays();
        }
    }
}

function updateK() {
    k = (j * 8);
    if (j === 0) {
        k = 0;
    }
}

function applyData(serverData) {
    applyCity(serverData);
    applyDay(serverData);
    applyTemp(serverData);
    applyDescription(serverData);
    applyIcon(serverData);
}

function applyCity(serverData) {
    let cityHeader = document.getElementsByClassName("cityHeader")[0];
    cityHeader.innerHTML = "5 day weather prediction for " + serverData.city.name;
}

function applyDay(serverData) {
    let dayOfWeek = document.getElementsByClassName("dateOfWeek")[j];
    date = new Date(serverData.list[k].dt * 1000);
    dayOfWeek.innerHTML = date.toLocaleDateString('en', options);
}

function applyTemp(serverData) {
    let temperatureElement = document.getElementsByClassName("temperature")[j];
    temperatureElement.innerHTML = Math.floor(serverData.list[k].main.temp) + ' °C';
}

function applyDescription(serverData) {
    let weatherDiscription = document.getElementsByClassName("weatherDiscription")[j];
    weatherDiscription.innerText = serverData.list[k].weather[0].description;
}

function applyIcon(serverData) {
    Icons = document.getElementsByClassName("iconDiv")[j];
    weatherIcon = serverData.list[k].weather[0].icon;
    selectIcon();
}

function selectIcon() {
    if //CLEAR SKY
        (weatherIcon === "01d" || weatherIcon === "01n") {
        Icons.innerHTML = '<i class="fas fa-sun"></i>';
    } else if //FEW CLOUDS
        (weatherIcon === "02d" || weatherIcon === "02n") {
        Icons.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if //SCATTERED OR BROKEN CLOUDS
        (weatherIcon === "03d" || weatherIcon === "04d" || weatherIcon === "03n" || weatherIcon === "04n") {
        Icons.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if //SHOWER RAIN
        (weatherIcon === "09d") {
        Icons.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if //RAIN
        (weatherIcon === "10d" || weatherIcon === "10n") {
        Icons.innerHTML = '<i class="fas fa-cloud-rain"></i>';
    } else if //THUNDERSTORM
        (weatherIcon === "11d") {
        Icons.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if //SNOW
        (weatherIcon === "13d") {
        Icons.innerHTML = '<i class="fas fa-snowflake"></i>';
    } else if //FOG 
        (weatherIcon === "50d") {
        Icons.innerHTML = '<i class="fas fa-smog"></i>';
    }
}

function pushDays() {
    dayOne.push(week[0]);
    dayTwo.push(week[1]);
    dayThree.push(week[2]);
    dayFour.push(week[3]);
    dayFive.push(week[4]);
}