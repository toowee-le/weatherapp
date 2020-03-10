window.addEventListener('load', () => {
    let longitude;
    let latitude;

    let currentTemp = document.getElementById('degree');
    let description = document.getElementById('description');
    let currentLocation = document.getElementById('location');

    // Get the latitude and longitude of the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/ef062569720f0a4a50be50c0492a8d82/${latitude},${longitude}`;

            // Get the information from the weather API server
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Set DOM elements to API data
                const { temperature, summary, } = data.currently;
                currentTemp.textContent = Math.floor(temperature);
                description.textContent = summary;
                currentLocation.textContent = data.timezone;
            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    };
});