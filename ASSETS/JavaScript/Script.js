const APIKey = "3491918a67f25636c1431da5bbdee72d"
const city = 'London'; // Replace with the desired city name

fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid={APIkey}`)
  .then(response => response.json())
  .then(data => {
    // Handle the data returned from the API
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the API call
    console.error(error);
  });