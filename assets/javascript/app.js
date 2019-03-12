var topics = ["Batman", "Superman"];

function renderButtons() {
  $("#buttons-view").empty();
  for (i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("animals");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}
function animateGif() {}
function displayGifs() {
  query = "Bruce+wayne"; //$(this).attr("data-name");

  queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    query +
    "&api_key=Tjq28pTEJGUwqLqHfYeaewOJ5xEu3UJd&limit=10";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var gifDiv = $("<div class='gifs'>");
    for (i = 0; i < response.data.length; i++) {
      var gifStillURL = response.data[i].images.original_still.url;
      var gifAnimatedURL = response.data[i].images.original.url;
      var gifDisplay = $("<img>").attr("src", gifStillURL);
      var gifRating = response.data[i].rating.toUpperCase();
      gifDiv.append(gifDisplay);
      gifDiv.append("<p id='gifRating'>Rating: " + gifRating + "</p>");
      $("gifDisplay").on("click", function() {
        var gifDisplay = $("<img>").attr("src", gifAnimatedURL);
      });
    }
    $("#buttons-view").append(gifDiv);
  });
}

renderButtons();
displayGifs();
