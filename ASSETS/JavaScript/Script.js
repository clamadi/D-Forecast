const APIKey = "72eef937a219617ed9184ae03be96fba";
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

function getCityData(event) {
  event.preventDefault();
  let searchValue = searchInput.value;
  console.log(searchValue);
  fetchData(searchValue);
}

searchButton.addEventListener("click", getCityData);

function fetchData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      // Handle the data returned from the API
      console.log(data);

      // Update City name
      const currentDate = dayjs().format('MM/DD/YYYY');
      console.log(currentDate);
      const cityNameElement = document.querySelector("#today h3");
      cityNameElement.textContent = `${cityName} (${currentDate})`;

      // Update the temperature
      const temperature = data.main.temp;
      const temperatureElement = document.querySelector("#today h4:nth-child(2)");
      temperatureElement.textContent = `Temperature: ${temperature}°C`;

      // Update the wind speed
      const windSpeed = data.wind.speed;
      const windSpeedElement = document.querySelector("#today h4:nth-child(3)");
      windSpeedElement.textContent = `Wind: ${windSpeed} M/S`;

      // Update the humidity
      const humidity = data.main.humidity;
      const humidityElement = document.querySelector("#today h4:nth-child(4)");
      humidityElement.textContent = `Humidity: ${humidity}%`;

      // Update the weather icon
      const weatherIcon = data.weather[0].icon;
      const weatherIconElement = document.querySelector("#today .icon img");
      weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      weatherIconElement.alt = "weather icon";

      // Update the weather description
      const weatherDescription = data.weather[0].description;
      const weatherDescriptionElement = document.querySelector("#today .icon h5");
      weatherDescriptionElement.textContent = weatherDescription;

      handleForecasts(data.coord.lat, data.coord.lon);
    })
    .catch(error => {
      // Handle any errors that occur during the API call
      console.error(error);
    });
}

function handleForecasts(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
      // Handle the data returned from the API
      console.log(data);

      // Update the forecast cards
      const forecastCards = document.querySelectorAll("#forecast .card");
      data.list.forEach((forecast, index) => {
        const date = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
        const temperature = forecast.main.temp;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;
        const forecastCard = forecastCards[index];
        forecastCard.querySelector("h3").textContent = `(${date})`;
        forecastCard.querySelector("h4:nth-child(2)").textContent = `Temp: ${temperature}°C`;
        forecastCard.querySelector("h4:nth-child(3)").textContent = `Wind: ${windSpeed} M/S`;
        forecastCard.querySelector("h4:nth-child(4)").textContent = `Humidity: ${humidity}%`;
      });
    })
    .catch(error => {
      // Handle any errors that occur during the API call
      console.error(error);
    });
}
