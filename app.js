window.addEventListener('load', () => {
    let longitude;
    let latitude;

    // Get the latitude and longitude of the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            // To avoid the cors issue, run the API through a proxy
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/ef062569720f0a4a50be50c0492a8d82/${latitude},${longitude}`;

            // Fetch the weather information from the Dark Sky API server
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon, humidity, windSpeed, precipProbability, pressure } = data.currently;

                // Set DOM elements to JSON/API data
                document.getElementById('location').textContent = data.timezone;
                document.getElementById('degree').textContent = Math.floor(temperature);
                document.getElementById('description').textContent = summary;
                document.getElementById('humidity').textContent = `Humidity: ${Math.floor(humidity*100)}%`;
                document.getElementById('wind').textContent = `Wind: ${windSpeed} mph`;
                document.getElementById('precipitation').textContent = `Precipitation: ${precipProbability}%`;
                document.getElementById('pressure').textContent = `Pressure: ${pressure} mb`;                
            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    };
});