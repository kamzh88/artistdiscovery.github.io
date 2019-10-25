$(document).ready(function () {
    var artist = ["Lady Gaga"]

    var queryURL = "https://itunes.apple.com/search?term=" + artist;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(JSON.parse(response));
    })
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=" + artist + "&apikey=zOsl8qw2cJozfhalFYHMmDpGBYjFaNfr";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log((response));
    })
})




