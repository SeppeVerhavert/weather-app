
#  weather-app

Here I make a basic weather application using data from API's.

## The Mission

### Sprint 1

- Create an account on [openweathermap.org](https://home.openweathermap.org/)
- Generate a key
- Create a home page where you ask the visitor to enter the city of his choice.  

### Sprint 2

-   Get the weather data using axios.
-   Use a cdn link to link axios to your project.
-   Display the weather for the next 5 days.
-   axios have two methods GET/POST...
-   Apply styling to your project using media queries to make it responsive.
  

##  The Code

### Fetch data from the API
```javascript
function  searchWeather(searchTerm)  {
	fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
		.then((result)  =>  {
			return  result.json();
		})
		.then((res)  =>  {
			showData(res);
		});
}
```

### Implement data in HTML
```javascript
function  showData(serverData)  {
	for (j  =  0;  j  !=  5;  j  +=  1) {
		let  k  = (j  *  8) -  1;
		if (j  ===  0) {k  =  0;}

		let  dayOfWeek  =  document.getElementsByClassName("dateOfWeek")[j];
		let  temperatureElement  =  document.getElementsByClassName("temperature")[j];
		let  weatherDiscription  =  document.getElementsByClassName("weatherDiscription")[j];
		Icons  =  document.getElementsByClassName("iconDiv")[j];
		let  resultDesciption  =  serverData.list[k].weather[0].description;

		date  =  new  Date(serverData.list[k].dt  *  1000);
		dayOfWeek.innerHTML  =  date.toLocaleDateString('en',  options);
		temperatureElement.innerHTML  =  Math.floor(serverData.list[k].main.temp) +  ' °C';
		weatherDiscription.innerText  =  resultDesciption;
		weatherIcon  =  serverData.list[k].weather[0].icon;
		applyIcon();
	
		for (i  =  0;  i  <  serverData.list.length;  i  +=  8) {
		week.push(serverData.list[i].main);
		pushDays();
		}
	}
}
```
### Responsiveness
```css
@media  only  screen  and  (min-device-width  :  768px)  and  (max-device-width  :  1024px)  {
	body  { width:  90%; }
	.dayContainer  { width:  23%; }
	.firstDay  { width:  100%; }
}
```

  

##  Live Version

Check the weather [here](https://seppeverhavert.github.io/weather-app/).

##  Credits

Icons owned by Font-Awesome on https://fontawesome.com/.
