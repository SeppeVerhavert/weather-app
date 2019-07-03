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

let j = 0;
let options = { weekday: 'long' };

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            showData(res);
        });
}

function showData(resultFromServer) {

    for (j = 0; j != 5; j += 1) {
        let k = (j * 8) - 1;

        if (j === 0) {
            k = 0;
        }

        let cityHeader = document.getElementsByClassName("cityHeader")[0];
        let dayOfWeek = document.getElementsByClassName("dateOfWeek")[j];
        let temperatureElement = document.getElementsByClassName("temperature")[j];
        let weatherDescriptionHeader = document.getElementsByClassName("weatherDiscriptionHeader")[j];
        Icons = document.getElementsByClassName("iconDiv")[j];

        cityHeader.innerHTML = "You searched on " + resultFromServer.city.name;
        date = new Date(resultFromServer.list[k].dt * 1000);
        dayOfWeek.innerHTML = date.toLocaleDateString('en', options);
        temperatureElement.innerHTML = Math.floor(resultFromServer.list[k].main.temp) + ' °C';
        let resultDesciption = resultFromServer.list[k].weather[0].description;
        weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);
        weatherIcon = resultFromServer.list[k].weather[0].icon;
        applyIcon();

        for (i = 0; i < resultFromServer.list.length; i += 8) {
            week.push(resultFromServer.list[i].main);
            pushDays();
        }
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
        Icons.innerHTML = '<img src="./images/sun-solid.png">';
    } else if //FEW CLOUDS
        (weatherIcon === "02d") {
        Icons.innerHTML = '<img src="./images/cloud-sun-solid.png">';
    } else if //SCATTERED OR BROKEN CLOUDS
        (weatherIcon === "03d" || weatherIcon === "04d") {
        Icons.innerHTML = '<img src="./images/cloud-solid.png">';
    } else if //SHOWER RAIN
        (weatherIcon === "09d") {
        Icons.innerHTML = '<img src="./images/cloud-showers-heavy-solid.png">';
    } else if //RAIN
        (weatherIcon === "10d") {
        Icons.innerHTML = '<img src="./images/cloud-sun-rain-solid.png">';
    } else if //THUNDERSTORM
        (weatherIcon === "11d") {
        Icons.innerHTML = '<img src="./images/thunderstorm-solid.png">';
    } else if //SNOW
        (weatherIcon === "13d") {
        Icons.innerHTML = '<img src="./images/snowflake-solid.png">';
    } else if //FOG 
        (weatherIcon === "50d") {
        Icons.innerHTML = '<img src="./images/smog-solid.png">';
    }
}