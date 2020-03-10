window.addEventListener('load', () => {
    let longitude;
    let latitude;

    // Get the latitude and longitude of the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    };
});