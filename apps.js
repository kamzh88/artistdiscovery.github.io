
$(document).ready(function () {
  
    var tmAuthKey = "zOsl8qw2cJozfhalFYHMmDpGBYjFaNfr";
    var queryTerm = "";
    var startDate = 0;
    var endDate = 0;
    var limitMusic = "&locale=*&classificationName=music";


    //URL Base
    var queryURLBase = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=" + tmAuthKey + limitMusic;
    // var queryURL = "https://itunes.apple.com/search?term=" + queryTerm;

    function runTM(queryURL) {

        //ajax call for ticketmaster
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (TMData) {

            var pictureURL = TMData._embedded.events[0].images[3].url
            console.log(TMData);
            console.log(queryURL);

            for (var i = 0; i < TMData._embedded.events.length; i++) {

                if (TMData._embedded.events[i]._embedded.venues[0].state != undefined) {
                    var eventState = TMData._embedded.events[i]._embedded.venues[0].state.stateCode
                } else {
                    var eventState = 'n/a'
                }
                var eventCity = TMData._embedded.events[i]._embedded.venues[0].city.name;
                var eventName = TMData._embedded.events[i].name;
                var eventDate = TMData._embedded.events[i].dates.start.localDate;
                var eventTime = TMData._embedded.events[i].dates.start.localTime;
                var ticketData = "<a href=" + TMData._embedded.events[i].url + "span class='buy-tag'>Buy Tickets!</a>";

                $("#tm-events").append(`
                    <p class='event-name'> ${eventName}</p>
                         ${eventCity} , ${eventState}<br>
                    Date: ${eventDate} Time: ${eventTime}<br>
                    ${ticketData} <br><br>
                    `)
            };

            var artistImage = $('<img>').attr({
                'src': pictureURL,
                'class': 'gif'
            })

            $('#picture').append(artistImage);

        });

    };
    function runItunes(queryURL) {
        //ajax call for itunes
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (ITUNESData) {

            var response = JSON.parse(ITUNESData)

            console.log(response)
            var nameOfArtist = ("<div>" + queryTerm +"</div>");
            var upperCase = nameOfArtist.toUpperCase();
            $(nameOfArtist).append(upperCase)
            $("#name").append(upperCase);
            
            for (let i = 0; i < 10; i++) {
                var itunesLog = $("<div>");
                itunesLog.attr('id', 'ItunesSection' + i);
                $("#itunesInfo").append(itunesLog);
                $('#ItunesSection' + i).append("<h1>" + response.results[i].trackName + "<h1>")
                $('#ItunesSection' + i).append("<a href=" + response.results[i].trackViewUrl + "span class='song-preview'> Preview Song <br> </a>")
                $('#ItunesSection' + i).append("<a href=" + response.results[i].artistViewUrl+ "span class='itunes-page'> Artist Itunes Page </a>")


            }
        })
    }

    function clear() {
        $('#itunesInfo').empty();
        $('#picture').empty();
        $('#name').empty();
        $('#tm-events').empty();
    }

    $('.clear-btn').on('click', function () {
        clear();
    })

    $('#submit-btn').on('click', function () {
        clear();
        artistSearch = $('#artist-search').val().trim()
        console.log(artistSearch)

        //Get search term for  Ticket Master
        event.preventDefault()
        queryTerm = $("#artist-search").val().trim();
        var newURL = queryURLBase + "&keyword=" + queryTerm;

        startDate = $("#start-date").val();
        endDate = $("#end-date").val().trim();

        if (parseInt(startDate && endDate)) {

            startDate = startDate + 'T09:00:00Z'
            endDate = endDate + 'T00:00:00Z'

            newURL = newURL + '*&startDateTime=' + startDate + '&endDateTime=' + endDate;
        }

    
        // console.log(itunesUrl);

        
        if(artistSearch !== ''){
            console.log("runs")
          
            runTM(newURL);

            var itunesUrl = "https://itunes.apple.com/search?term=" + queryTerm;
    
            runItunes(itunesUrl);

        } else {
            $("#showModal").modal('show');
                
            }
        
    })

})



