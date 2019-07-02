let appId = '51edef6c4976ee55fb94fa75f9d29de3';
let units = 'imperial';
let searchMethod;

let temperatureElement = document.getElementById("temperature");
let cityHeader = document.getElementById("cityHeader");
let weatherDescriptionHeader = document.getElementById("weatherDiscriptionHeader");
let weatherIcon = document.getElementById("documentIconImg");

let Icons = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Fog', 'Snow'];

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
    if (weatherIcon === "10d") { //LIGHT RAIN
        document.querySelector(".fa-cloud-sun-rain").style.display = "block";
    }
}