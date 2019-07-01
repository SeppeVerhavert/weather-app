let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'imperial';
let searchMethod;

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
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
        });
}
function init(resultFromServer) {
    let weatherDescriptionHeader = document.getElementById("weatherDiscriptionHeader");
    let temperatureElement = document.getElementById("temperatureElement");
    let humidityElement = document.getElementById("humidityElement");
    let windspeedElement = document.getElementById("windspeedElement");
    let cityHeader = document.getElementById("cityHeader");
    let weatherIcon = document.getElementById("documentIconImg");

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDesciption = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDesciption;
}

function checkInput() {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
}