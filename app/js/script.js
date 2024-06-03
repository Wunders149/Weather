async function fetchWeather(latitude, longitude) {
  try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1cdb4ab25b9bcd43335ae4cb1055b816&units=metric`);
      const data = await response.json();
      document.getElementById('location').textContent = data.name;
      document.getElementById('day').textContent = new Date().toLocaleDateString();
      document.getElementById('temperature').textContent = `${data.main.temp}°C`;
      document.getElementById('fahrenheit').textContent = `${(data.main.temp * 9/5 + 32).toFixed(2)}°F`;
      document.getElementById('weather-description').textContent = data.weather[0].description;
  } catch (error) {
      document.getElementById('location').textContent = 'Error fetching data';
  }
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
      }, error => {
          document.getElementById('location').textContent = 'Location access denied';
      });
  } else {
      document.getElementById('location').textContent = 'Geolocation not supported';
  }
}

getLocation();