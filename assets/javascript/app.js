//array of superheroes
var topics = ["BATMAN", "SUPERMAN", "HULK", "SPIDER MAN"];

//create buttons based on array of superheroes
function renderButtons() {
  $("#buttons-view").empty();
  for (i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("superheroes");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}

//retrieve and display gifs of superheroes
function displayGifs() {
  query = $(this).attr("data-name");

  queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    query +
    "&api_key=Tjq28pTEJGUwqLqHfYeaewOJ5xEu3UJd&limit=10";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    var gifDiv = $("<div class='gifClass'>");

    //clears gifs already on page
    $(".gifClass").empty();

    for (i = 0; i < response.data.length; i++) {
      //URL of still image
      var gifStillURL = response.data[i].images.original_still.url;
      //URL of animated image
      var gifAnimatedURL = response.data[i].images.original.url;
      //URL of rating
      var gifRating = response.data[i].rating.toUpperCase();

      //initial still gif
      var gifDisplay = $(
        "<img class='gifs' data-still=" +
          gifStillURL +
          " data-animate=" +
          gifAnimatedURL +
          " data-state='still'>"
      ).attr("src", gifStillURL);

      //displays gifs
      gifDiv.append(gifDisplay);
      //displays rating under gif image
      gifDiv.append("<p id='gifRating'>Rating: " + gifRating + "</p><hr>");
    }
    //makes sure buttons and search bar remain on top of page
    $("#remainOnTop").append(gifDiv);
  });
}

//function that alter the state of the gif on click (from still to animated and animated to still)
$(document).on("click", ".gifs", function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

//funtion that adds a button of the superhero entered in search form
$("#add-superhero").on("click", function(event) {
  event.preventDefault();
  //will always display in uppercase on button to insure consistency
  var superhero = $("#superhero-input")
    .val()
    .trim()
    .toUpperCase();
  //adds superhero to array
  topics.push(superhero);
  renderButtons();
});

//displays gifs on clicking the superhero button
$(document).on("click", ".superheroes", displayGifs);

//displays initial buttons
renderButtons();
