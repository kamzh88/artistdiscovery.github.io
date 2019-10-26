$(document).ready(function () {

    var tmAuthKey = "zOsl8qw2cJozfhalFYHMmDpGBYjFaNfr";
    var queryTerm = "";
    var city = "";
    var startDate = 0;
    var endDate = 0;
    

    //URL Base
    var queryURLBase ="https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=" + tmAuthKey;

    function runQuery(queryURL) {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (TMData) {
            console.log((TMData));
            console.log(queryURL);
        })

    }

    $('#submit-btn').on('click', function() {
        //Get search term
        event.preventDefault()
        queryTerm= $("#artist-search").val().trim();

        var newURL = queryURLBase + "&keyword=" + queryTerm;

        runQuery(newURL);
    })



    


























            // var queryURL = "https://itunes.apple.com/search?term=" + artist;

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (ITUNESData) {
        //     console.log(JSON.parse(ITUNESData));
        // })

        // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=" + artist + "&apikey=zOsl8qw2cJozfhalFYHMmDpGBYjFaNfr";
})



