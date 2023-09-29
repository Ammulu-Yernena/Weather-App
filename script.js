// PLease check with your own API key
const apiKey = '2b628d2a793246e7dfb84368faa67794';  

document.getElementById('searchBtn').addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
        if (locationInput) {
            getWeather(locationInput);
        }
    });

        document.getElementById('toggleUnitBtn').addEventListener('click', () => {
            isCelsius = !isCelsius;
            const locationInput = document.getElementById('locationInput').value;
            if (locationInput) {
                getWeather(locationInput);
            }
        });

        let isCelsius = true; 

        function getTemperatureUnit() {
            return isCelsius ? 'metric' : 'imperial'; 
        }

        function getWeather(location) {
            const temperatureUnit = getTemperatureUnit();
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${temperatureUnit}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    displayWeather(data);
                })
                .catch((error) => {
                    console.error(error);
                    displayError('Location not found.');
                });
        }

        function displayWeather(data) {
            const weatherInfo = document.querySelector('.weather-info');
            weatherInfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°${isCelsius ? 'C' : 'F'}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} ${isCelsius ? 'm/s' : 'mph'}</p>
            `;
        }

        function displayError(message) {
            const weatherInfo = document.querySelector('.weather-info');
            weatherInfo.innerHTML = `<p class="error">${message}</p>`;
        }
