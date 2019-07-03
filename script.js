let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'metric';
let searchMethod = "q";

document.getElementById('searchBtn').addEventListener('click', checkInput);

let Icons;

let week = [];
let dayOne = [];
let dayTwo = [];
let dayThree = [];
let dayFour = [];
let dayFive = [];

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            showData(res);
        });
}

function showData(resultFromServer) {

    let j = 0;
    let k = j*8;
    console.log(week.length);
    console.log(j);

    for (j = 0; j <= week.length; j += 1) {
        let cityHeader = document.getElementsByClassName("cityHeader")[0];
        let temperatureElement = document.getElementsByClassName("temperature")[j];
        let weatherDescriptionHeader = document.getElementsByClassName("weatherDiscriptionHeader")[j];
        Icons = document.getElementsByClassName("iconDiv")[j];

        cityHeader.innerHTML = "You searched on " + resultFromServer.city.name;
        temperatureElement.innerHTML = Math.floor(resultFromServer.list[k].main.temp) + ' °C';
        let resultDesciption = resultFromServer.list[j].weather[k].description;
        weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);
        weatherIcon = resultFromServer.list[j].weather[k].icon;
        applyIcon();

        for (i = 0; i < resultFromServer.list.length; i += 8) {
            week.push(resultFromServer.list[i].main);
            pushDays();
        }

        console.log(week.length);
        console.log(j);
    }
}

function pushDays() {
    dayOne.push(week[0]);
    dayTwo.push(week[1]);
    dayThree.push(week[2]);
    dayFour.push(week[3]);
    dayFive.push(week[4]);
}

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
}

function applyIcon() {
    if //CLEAR SKY
        (weatherIcon === "01d") {
        Icons.innerHTML = '<i class="fas fa-sun"></i>';
    } else if //FEW CLOUDS
        (weatherIcon === "02d") {
        Icons.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if //SCATTERED OR BROKEN CLOUDS
        (weatherIcon === "03d" || weatherIcon === "04d") {
        Icons.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if //SHOWER RAIN
        (weatherIcon === "09d") {
        Icons.innerHTML = '<i class="fas fa-cloud-sun-rain"></i>';
    } else if //RAIN
        (weatherIcon === "10d") {
        Icons.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if //THUNDERSTORM
        (weatherIcon === "11d") {
        Icons.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if //SNOW
        (weatherIcon === "13d") {
        Icons.innerHTML = '<i class="far fa-snowflake"></i>';
    } else if //FOG 
        (weatherIcon === "50d") {
        Icons.innerHTML = '<i class="fas fa-smog"></i>';
    }
}