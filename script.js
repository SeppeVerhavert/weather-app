let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'imperial';
let searchMethod;

let weatherDescriptionHeader = document.getElementById("weatherDiscriptionHeader");
let temperatureElement = document.getElementById("temperature");
let humidityElement = document.getElementById("humidity");
let windspeedElement = document.getElementById("windSpeed");
let cityHeader = document.getElementById("cityHeader");
let weatherIcon = document.getElementById("documentIconImg");


// let weatherIcon = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Fog', 'Snow'];

document.getElementById('searchBtn').addEventListener('click', checkInput);

function getSearchOnMethod(searchTerm) {
    if (searchTerm.length <= 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = "zip";
    } else {
        searchMethod = "q";
    }
}

function searchWeather(searchTerm) {
    getSearchOnMethod(searchTerm);
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

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.list[0].weather.icon + '.png';

    let resultDesciption = resultFromServer.weather.description;
    weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '°';
    windspeedElement.innerHTML = 'winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'humidity levels at ' + resultFromServer.main.humidity + '%';
}

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
}