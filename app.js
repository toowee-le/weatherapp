const degree = document.getElementById('currentTempSection');
const currentTemp = document.getElementById('degree');
const degreeScale = document.querySelector('span');
const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

                // JSON data
                const { time, temperature, summary, icon, humidity, windSpeed, precipProbability, pressure } = data.currently;

                let timeStamp = new Date(data.currently.time * 1000);
                let forecastDate = `${day[timeStamp.getDay()]} ${timeStamp.getDate()} ${month[timeStamp.getMonth()]} ${timeStamp.getFullYear()}`;

                // Set DOM elements to JSON/API data
                document.getElementById('date').textContent = forecastDate;
                document.getElementById('location').textContent = data.timezone;
                document.getElementById('degree').textContent = Math.floor(temperature);
                document.getElementById('description').textContent = summary;
                document.getElementById('humidity').textContent = `Humidity: ${Math.floor(humidity*100)}%`;
                document.getElementById('wind').textContent = `Wind: ${windSpeed} mph`;
                document.getElementById('precipitation').textContent = `Precipitation: ${precipProbability}%`;
                document.getElementById('pressure').textContent = `Pressure: ${pressure} mb`;    
                
                // Formula for converting Fahrenheit to Celsius
                let celsius = (temperature - 32) * (5 / 9);

                // Change temperature to Celsius/Fahrenheit on click
                degree.addEventListener('click', () => {
                    if (degreeScale.textContent === "F") {
                        degreeScale.textContent = "C";
                        currentTemp.textContent = Math.floor(celsius);
                    } else {
                        degreeScale.textContent = "F";
                        currentTemp.textContent = Math.floor(temperature);
                    }
                });
            })
        })
    } else {
        alert("Geolocation is not supported by this browser.");
    };
});