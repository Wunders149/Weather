document.addEventListener('DOMContentLoaded', () => {
  const weatherContainer = document.getElementById('weather-container');
  const locationElement = document.getElementById('location');
  const dayElement = document.getElementById('day');
  const temperatureElement = document.getElementById('temperature');
  const fahrenheitElement = document.getElementById('fahrenheit');
  const weatherDescriptionElement = document.getElementById('weather-description');

  // Obtenir la localisation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = '1cdb4ab25b9bcd43335ae4cb1055b816';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      
      // Obtenir les données météo
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const tempCelsius = data.main.temp;
        const tempFahrenheit = (tempCelsius * 9/5) + 32;
        const description = data.weather[0].description;
        const city = data.name;
        const country = data.sys.country;

        // Mettre à jour l'interface utilisateur
        locationElement.textContent = `${city}, ${country}`;
        dayElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        temperatureElement.textContent = `${tempCelsius.toFixed(1)}°C`;
        fahrenheitElement.textContent = `${tempFahrenheit.toFixed(1)}°F`;
        weatherDescriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Unable to get weather data';
      }
    }, (error) => {
      console.error('Error getting location:', error);
      locationElement.textContent = 'Unable to get location';
    });
  } else {
    locationElement.textContent = 'Geolocation is not supported by this browser.';
  }
});