$(document).ready(function () {
var artist=["Lady Gaga"]



var queryURL="https://itunes.apple.com/search?term="+ artist;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(JSON.parse(response));  
    })

})