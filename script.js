const apiKey = '1a09467ab8e5e256dfbaae8fe41ca4af';


function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('location').innerText = `${data.name}, ${data.sys.country}`;
                    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
                    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
                    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
                    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

                    const icon = data.weather[0].icon;
                    document.getElementById('weather-icon').style.backgroundImage = `url('https://openweathermap.org/img/wn/${icon}@2x.png')`;
                })
                .catch(error => console.error('Error fetching the weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
