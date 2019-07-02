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
    // console.log(resultFromServer.list[0]);
    // console.log(resultFromServer.list[5]);
    // console.log(resultFromServer.list[13]);
    // console.log(resultFromServer.list[21]);
    // console.log(resultFromServer.list[29]);

    let resultDesciption = resultFromServer.list[0].weather[0].description;
    weatherDescriptionHeader.innerText = resultDesciption.charAt(0).toUpperCase() + resultDesciption.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.list[0].main.temp) + ' °C';
    weatherIcon = resultFromServer.list[0].weather[0].icon;
    cityHeader.innerHTML = resultFromServer.city.name;
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
        iconDiv.innerHTML = '<i class="fas fa-sun"></i>';
    } else if //FEW CLOUDS
        (weatherIcon === "02d") { 
        iconDiv.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    } else if //SCATTERED OR BROKEN CLOUDS
        (weatherIcon === "03d" || weatherIcon === "04d") { 
        iconDiv.innerHTML = '<i class="fas fa-cloud"></i>';
    } else if //SHOWER RAIN
        (weatherIcon === "09d") { 
        iconDiv.innerHTML = '<i class="fas fa-cloud-sun-rain"></i>';
    } else if //RAIN
        (weatherIcon === "10d") { 
        iconDiv.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
    } else if //THUNDERSTORM
        (weatherIcon === "11d") { 
        iconDiv.innerHTML = '<i class="fas fa-bolt"></i>';
    } else if //SNOW
        (weatherIcon === "13d") { 
        iconDiv.innerHTML = '<i class="far fa-snowflake"></i>';
    } else if //FOG 
        (weatherIcon === "50d") { 
        iconDiv.innerHTML = '<i class="fas fa-smog"></i>';
    }
}