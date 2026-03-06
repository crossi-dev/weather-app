const API_KEY = '11d0acea2baf5dccb9221a75be3f8c75';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const results = document.getElementById('results');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

async function fetchWeather(city) {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.log('API error response:', errorData);
    throw new Error(response.status === 404 ? 'City not found.' : 'Something went wrong. Please try again.');
  }

  return response.json();
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  results.classList.remove('error');
  results.style.display = 'block';
}

function displayError(message) {
  cityName.textContent = message;
  temperature.textContent = '';
  description.textContent = '';
  results.classList.add('error');
  results.style.display = 'block';
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const data = await fetchWeather(city);
    displayWeather(data);
  } catch (err) {
    displayError(err.message);
  }
}

searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});
