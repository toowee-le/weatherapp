window.addEventListener('load', () => {
    let longitude;
    let latitude;

    // Get the latitude and longitude of the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/cb345289941bd4c429c64c55a6af659f/${latitude},${longitude}`;

            // Get the information from the weather API server
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    };
});