const ota = document.getElementById('otaDiv');
const inputde = document.getElementById("searchInput");

const cities = (city) => {
  axios
    .get(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=19a201ca315d466590644443241312`)
    .then((response) => {
      const fore = response.data.forecast;
      const res = response.data;
      const location = res.location.region;
      const temperature = res.current.temp_c;
      const windSpeed = res.current.wind_kph;
      const text = res.current.condition.text;
      const cloud = res.current.cloud;
      const country = res.location.country;
      const icon = res.current.condition.icon;
      const date = res.location.localtime;
      const sunrise = fore.forecastday[0].astro.sunrise;
      const sunset = fore.forecastday[0].astro.sunset;

      const hours = fore.forecastday[0].hour.filter((hourData, index) => index % 4 === 0).map(hourData => ({
        time: hourData.time.slice(10),
        icon: hourData.condition.icon,
        temp: hourData.temp_c
    }));
    

      const iconDays = fore.forecastday[0].day.condition.icon;

      ota.innerHTML = `
        <main class="main-container">
          <div class="location-and-date">
            <h1 class="location-and-date__location">${location}</h1>
            <div>${date}</div>
          </div>
  
          <div class="current-temperature">
            <div class="current-temperature__icon-container">
              <img src="${icon}" class="current-temperature__icon" alt="Weather icon">
            </div>
            <div class="current-temperature__content-container">
              <div class="current-temperature__value">${temperature}&deg;C</div>
              <div class="current-temperature__summary">${text}</div>
            </div>
          </div>
  
          <div class="current-stats">
            <div>
              <div class="current-stats__value">${temperature}&deg;</div>
              <div class="current-stats__label">Temperature</div>
            </div>
            <div>
              <div class="current-stats__value">${windSpeed} mph</div>
              <div class="current-stats__label">Wind</div>
              <div class="current-stats__value">${cloud}%</div>
              <div class="current-stats__label">Cloud</div>
            </div>
            <div>
              <div class="current-stats__value">${sunrise}</div>
              <div class="current-stats__label">Sunrise</div>
              <div class="current-stats__value">${sunset}</div>
              <div class="current-stats__label">Sunset</div>
            </div>
          </div>

          <div class="weather-by-hour">
            <h2 class="weather-by-hour__heading">Today's weather</h2>
            <div class="weather-by-hour__container">
              ${hours.map(hour => `
                <div class="weather-by-hour__item">
                  <div class="weather-by-hour__hour">${hour.time}</div>
                  <img src="${hour.icon}" alt="Weather icon">
                  <div>${hour.temp}&deg;</div>
                </div>
              `).join('')}
            </div>
          </div>


          <div class="next-5-days">
            <h2 class="next-5-days__heading">Next 5 days</h2>
            <div class="next-5-days__container">
              ${fore.forecastday.slice(0, 5).map((day, index) => `
                <div class="next-5-days__row">
                  <div class="next-5-days__date">
                    ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })} 
                    <div class="next-5-days__label">${day.date}</div>
                  </div>
                  <div class="next-5-days__high">${day.day.avgtemp_c}&deg;</div>
                  <div class="next-5-days__icon">
                    <img src="${day.day.condition.icon}" alt="Weather icon">
                  </div>
                  <div class="next-5-days__rain">${day.day.daily_chance_of_rain}%</div>
                  <div class="next-5-days__wind">${day.day.maxwind_kph} km/h</div>
                </div>
              `).join('')}
            </div>
          </div>
        </main>
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};

// Example of calling the function with a city:
cities("Tashkent");
