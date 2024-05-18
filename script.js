const apiKey = '1a09467ab8e5e256dfbaae8fe41ca4af';
function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=en`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherElement = document.getElementById('weather');
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const city = data.name;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            
            weatherElement.innerHTML = `
                <h2>${city}</h2>
                <img src="${icon}" alt="Weather Icon" class="weather-icon">
                <div class="weather-info">
                    <p>Temperature: ${temp}°C</p>
                    <p>Condition: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = '<p>Failed to load weather data.</p>';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        }, () => {
            document.getElementById('weather').innerHTML = '<p>Unable to retrieve location.</p>';
        });
    } else {
        document.getElementById('weather').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

document.addEventListener('DOMContentLoaded', getLocation);

