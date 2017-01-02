$(document).ready(function(){
	var lat;
	var lon;

//Current Location

	$.getJSON('http://ip-api.com/json', function(data){
		lat = data.lat;
		lon = data.lon;

		$('#long').text("Longitude: " + lon);
		$('#lat').text("Latitude: " + lat);

		//Current Weather Data
		var apiKey = 'a4fcb2af4c3e8404740fe72b07552771';
		var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ apiKey;
		$.getJSON(url, function(data){
			var fTemp = data.main.temp + "F";
			var cTemp = ((data.main.temp - 32) * 5/9 ).toFixed(1) + "C";
			var description = data.weather[0].description;
			var country = data.sys.country;
			var state = data.name;
			var pressure = data.main.pressure;
			var humidity = data.main.humidity;
			var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
			var windSpeed = data.wind.speed;
			var tempSwitch = true;

		//To View On Page
			$('#temp').html("<p>Temperature: <br>" + fTemp + "<br>" + "<img src = " + icon + "><br>" + description.toUpperCase() + "</p>");
			$('#temp').click(function(){
				if(tempSwitch === false){
					$('#temp').html("<p>Temperature: <br>" + fTemp + "<br>" + "<img src = " + icon + "><br>" + description.toUpperCase() + "</p>");
					tempSwitch = true;
				}else{
					$('#temp').html("<p>Temperature: <br>" + cTemp + "<br>" + "<img src = " + icon + "><br>" + description.toUpperCase() + "</p>");
					tempSwitch = false;
				}
			});
			$('#location').html(state + ", " + country);


			//Changeing the Seasons
			switch(description)
			{
				case "mist":
				case "rain":
				case "thunderstorm":
				case "shower rain":
				case "overcast clouds":
					$('body').css('background-image','url(rain.jpg)');
				break;

				case "snow":
					$('body').css('background-image','url(snow.jpg)')
				break;

				case "clear sky":
				case "few clouds":
				case "scattered clouds":
				case "broken clouds":
					$('#body').css("background-image", "url(clouds.jpg)");
					$('p, h1').css('color','#161925');
				break;

				default:
					$('body').css("background-image",'url(sky.jpg)');
			};

			//Extra Data
			$('#pressure').html("Pressure in the area: " + pressure + " Pa");
			$('#humidity').html("Humidity in the area: " + humidity + " g/m3");
			$('#wind').html("Wind Speed: " + windSpeed + "mph");
		});
	});
});
