let coordinates = {}

$(document).ready(function () {
    get_coordinates();
    get_weather();
})

function get_coordinates() {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('source') && searchParams.has('destination')) {
        let source = searchParams.get('source')
        let destination = searchParams.get('destination')
        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lon = source.split(";")[1]
        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lon = destination.split(";")[1]
    } else {
        alert("Coordinates not selected!")
        window.history.back();
    }
}

function get_weather() {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type: "get",
        success: function (response) {
            let name = response.name
            let weather = response.weather[0].main;
            let temp = `${parseInt(response.main.temp)-273}°C`;
            let hum = `${response.main.humidity}%`;
            let ws = `${response.wind.speed} m/s`
            console.log(response)
            $("#name").html(`At <span class="c"><i>${name}</i></span>`)
            $("#weather").html(`Weather: ${weather}`);
            $("#temp").html(`Temperature: ${temp}`);
            $("#hum").html(`Humidity: ${hum}`);
            $("#ws").html(`Wind Speed: ${ws}`);
            $("#vis").html(`Visibility: ${response.visibility}`);
        }
    })
}