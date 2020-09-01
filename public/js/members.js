$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
  const title = $("#movieTitle");
  const rating = $("#rating");
  const writeUp = $("#writeUp");
  const streaming = $("#streamingService");

  $("#submitButton").on("click", function() {
    event.preventDefault();

    const newMovie = {
      title: title.val().trim(),
      rating: rating.val() / 10,
      writeUp: writeUp.val().trim(),
      streaming: streaming.val().trim(),
      recommend: $("[name=recommend]:checked")
        .val()
        .trim(),

      // userName: userInput.val().trim()
    };
    console.log(newMovie);
    $.ajax("/api/movie", {
      type: "POST",
      data: newMovie,
    }).then(() => {
      location.reload();
    });
  });
});
