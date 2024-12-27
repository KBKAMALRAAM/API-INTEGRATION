document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');

    if (city === '') {
        weatherDisplay.innerHTML = '<p>Please enter a city name!</p>';
        return;
    }

    // Geocoding API to get latitude and longitude
    const geoUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(city)}`;

    try {
        // Fetch latitude and longitude
        const geoResponse = await fetch(geoUrl);
        if (!geoResponse.ok) throw new Error('City not found!');
        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error('City not found!');

        const latitude = geoData[0].lat;
        const longitude = geoData[0].lon;

        // Fetch weather data from Open Meteo API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        weatherDisplay.innerHTML = `
            <h3>Weather in ${city}</h3>
            <p>Temperature: ${weatherData.current_weather.temperature}°C</p>
            <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
            <p>Weather Code: ${weatherData.current_weather.weathercode}</p>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
sa