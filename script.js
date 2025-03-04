async function getWeather(city) {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'your-rapidapi-key',  // Replace this with your actual API key
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Log the result to understand its structure
        console.log(result);

        // Update the weather info on the page
        document.getElementById('sunrise').textContent = result.astronomy.sunrise;
        document.getElementById('sunset').textContent = result.astronomy.sunset;
        document.getElementById('atmosphere').textContent = result.atmosphere ? result.atmosphere.description : 'N/A';
        document.getElementById('humidity').textContent = result.atmosphere.humidity;
        document.getElementById('pressure').textContent = result.atmosphere.pressure;
        document.getElementById('visibility').textContent = result.atmosphere.visibility;
        document.getElementById('wind').textContent = result.current_observation.wind.speed;

        // Update the table for other cities
        const tableBody = document.getElementById('weatherTableBody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${city}</th>
            <td>${result.astronomy.sunrise}</td>
            <td>${result.astronomy.sunset}</td>
            <td>${result.atmosphere.humidity}</td>
            <td>${result.atmosphere.pressure}</td>
            <td>${result.current_observation.condition.temperature}</td>
        `;
        tableBody.appendChild(newRow);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Event listener for city selection dropdown
document.getElementById('cityDropdown').addEventListener('click', function (e) {
    if (e.target && e.target.matches('a.dropdown-item')) {
        const selectedCity = e.target.getAttribute('data-city');
        getWeather(selectedCity);
    }
});  // <-- Close the event listener correctly here
