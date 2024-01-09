// Search Button
const seatchButton = document.getElementById('search-button');
seatchButton.addEventListener('click' , searchWeather);

// Search weather function
async function searchWeather() {
	const cityInput = document.getElementById('cityInput').value;
	const weatherDetails = document.getElementById('weather-details');

	// URL , Method and Headers
	const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityInput;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'ac2ce90b37mshfca0bf11774b8cfp1be69bjsn827d033820cb',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};


	try {
		const response = await fetch(url, options);
		const result = await response.text();			// Details in JSON format
		
		const weatherJSON = JSON.parse(result);			//  JSON to string

		const weatherData = {
			"cloud_pct": weatherJSON.cloud_pct,
			"temp": weatherJSON.temp,
			"feels_like": weatherJSON.feels_like,
			"humidity": weatherJSON.humidity,
			"min_temp": weatherJSON.min_temp,
			"max_temp": weatherJSON.max_temp,
			"wind_speed": weatherJSON.wind_speed,
			"wind_degrees": weatherJSON.wind_degrees,
			"sunrise": weatherJSON.sunrise,
			"sunset": weatherJSON.sunset
		};

		// Display weather details in a table
		weatherDetails.innerHTML = `
                <table>
                    <tr>
                        <th>Category</th>
                        <th>Details</th>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>${cityInput}</td>
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        <td>${weatherData.temp}°C</td>
                    </tr>
                    <tr>
                        <td>Feels Like</td>
                        <td>${weatherData.feels_like}°C</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>${weatherData.humidity}%</td>
                    </tr>
                    <tr>
                        <td>Min Temperature</td>
                        <td>${weatherData.min_temp}°C</td>
                    </tr>
                    <tr>
                        <td>Max Temperature</td>
                        <td>${weatherData.max_temp}°C</td>
                    </tr>
                    <tr>
                        <td>Wind Speed</td>
                        <td>${weatherData.wind_speed} m/s</td>
                    </tr>
                    <tr>
                        <td>Wind Degrees</td>
                        <td>${weatherData.wind_degrees}°</td>
                    </tr>
                    <tr>
                        <td>Sunrise</td>
                        <td>${new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</td>
                    </tr>
                    <tr>
                        <td>Sunset</td>
                        <td>${new Date(weatherData.sunset * 1000).toLocaleTimeString()}</td>
                    </tr>
                </table>
            `;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		weatherDetails.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
	}
}