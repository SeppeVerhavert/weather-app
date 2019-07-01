let searchTerm = document.getElementById('searchInput').value;

let appId='51edef6c4976ee55fb94fa75f9d29de3';
let units='metric';
let searchMethod='zip';

document.getElementById('searchBtn').addEventListener('click', checkInput);

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    }); 
}

function init(resultFromServer) {
    console.log(resultFromServer);
}

function checkInput() {
    console.log("yay");
    if (searchTerm) {
        searchWeather();
    }
}