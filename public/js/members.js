$(document).ready(() => {
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.userName);
  });

  $(".userName").on("click", function() {
    const userNameSelected = $(this).text();
    $.get("/api/user_data").then((data) => {
      console.log(data);
      if (userNameSelected === data.userName) {
        window.location.replace("/movies");
      } else {
        $.get("/api/userid/" + userNameSelected).then((data) => {
          $.get("/users=" + data).then(() => {
            window.location.replace("/users=" + data);
          });
        });
      }
    });
  });

  $(".delete-movie-review").on("click", function() {
    console.log($(this).data("id"));
    $.ajax("/api/movie/" + $(this).data("id"), {
      type: "DELETE",
    }).then(() => {
      location.reload();
    });
  });

  $(".delete-show-review").on("click", function() {
    console.log($(this).data("id"));
    $.ajax("/api/shows/" + $(this).data("id"), {
      type: "DELETE",
    }).then(() => {
      location.reload();
    });
  });

  $(".movieTitle").on("click", function() {
    const title = $(this).text();
    window.location.replace("/movies=" + title);
  });

  $("#searchButton").on("click", function() {
    const searchOption = $("#searchSelect").val();
    const searchValue = $("#searchInput")
      .val()
      .trim();
    switch (searchOption) {
      case "1":
        $.get("/api/userid/" + searchValue).then((data) => {
          if (data !== "404") {
            $.get("/users=" + data).then(() => {
              window.location.replace("/users=" + data);
            });
          } else {
            window.location.replace("/404");
          }
        });
        break;
      case "2":
        window.location.replace("/movies=" + searchValue);
        break;
      case "3":
        window.location.replace("/shows=" + searchValue);
        break;
      default:
        break;
    }
  });

  $(".showTitle").on("click", function() {
    const title = $(this).text();
    $.get(`/shows=${title}`).then((data) => {
      // console.log(data);
      // location.reload();
      window.location.replace("/shows=" + title);
    });
  });

  $("#addShow").on("click", function() {
    $("#inputForm")
      .empty()
      .append(
        `
    <form>
<div class="form-group text-light">
  <label for="movieTitle">Show Title</label>
  <input type="text" class="form-control bg-secondary border-dark text-light" id="showTitle">
</div>
<form>
  <div class="form-group text-light">
    <label for="rating">Rating(0 to 10)</label>
    <input type="range" class="form-control-range" id="rating">
  </div>
</form>
<div class="form-group text-light">
  <label for="writeUp">Write Up (max 240 characters)</label>
  <textarea class="form-control bg-secondary border-dark text-light" id="writeUp" rows="3"></textarea>
</div>
<div class="form-group text-light">
  <label for="movieTitle">How many episodes should someone watch before giving up?</label>
  <input type="number" class="form-control bg-secondary border-dark text-light" id="minEpisodes" value="0">
</div>
<div class="form-group text-light">
  <label for="streamingService">What streaming service did you watch it on?</label>
  <select class="form-control bg-secondary border-dark text-light" id="streamingService">
    <option>Netflix</option>
    <option>Hulu</option>
    <option>Amazon</option>
    <option>Apple Video</option>
    <option>Disney Plus</option>
    <option>HBO</option>
    <option>None of the above</option>
  </select>
</div>
<div class="form-group text-light">
  <div class="form-group">
    <label for="recommend"> Would you recommend this show?</label><br>
    <input type="radio" name="recommend" value="1" checked>Recommend<br>
    <input type="radio" name="recommend" value="0"> Do Not Recommend
  </div>
</div>
<button type="button" class="btn btn-warning" id="showSubmitButton">Submit</button>
</div>
    `
      );
    $("#showSubmitButton").on("click", function() {
      event.preventDefault();
      const title = $("#showTitle");
      const rating = $("#rating");
      const writeUp = $("#writeUp");
      const minEpisodes = $("#minEpisodes");
      const streaming = $("#streamingService");

      const newShow = {
        title: title.val().trim(),
        rating: rating.val() / 10,
        writeUp: writeUp.val().trim(),
        minEpisodes: minEpisodes.val().trim(),
        streaming: streaming.val().trim(),
        recommend: $("[name=recommend]:checked")
          .val()
          .trim(),

        // userName: userInput.val().trim()
      };
      console.log(newShow);
      $.ajax("/api/show", {
        type: "POST",
        data: newShow,
      }).then(() => {
        location.reload();
      });
    });
  });
  $("#addMovie").on("click", function() {
    $("#inputForm")
      .empty()
      .append(
        `
<form>
<div class="form-group text-light">
  <label for="movieTitle">Movie Title</label>
  <input type="text" class="form-control bg-secondary border-dark text-light" id="movieTitle">
</div>
<form>
  <div class="form-group text-light">
    <label for="rating">Rating(0 to 10)</label>
    <input type="range" class="form-control-range bg-secondary border-dark text-light" id="rating">
  </div>
</form>
<div class="form-group text-light">Write Up (max 240 characters)</label>
  <textarea class="form-control bg-secondary border-dark text-light" id="writeUp" rows="3"></textarea>
</div>
<div class="form-group text-light">
  <label for="streamingService">What streaming service did you watch it on?</label>
  <select class="form-control bg-secondary border-dark text-light" id="streamingService">
    <option>Netflix</option>
    <option>Hulu</option>
    <option>Amazon</option>
    <option>Apple Video</option>
    <option>Disney Plus</option>
    <option>HBO</option>
    <option>None of the above</option>
  </select>
</div>
<div class="form-group text-light">
  <div class="form-group">
    <label for="recommend"> Would you recommend this movie?</label><br>
    <input type="radio" name="recommend" value="1" checked>Recommend<br>
    <input type="radio" name="recommend" value="0"> Do Not Recommend
  </div>
</div>
<button type="button" class="btn btn-warning" id="movieSubmitButton">Submit</button>
</div>
`
      );
    $("#movieSubmitButton").on("click", function() {
      event.preventDefault();
      const title = $("#movieTitle");
      const rating = $("#rating");
      const writeUp = $("#writeUp");
      const streaming = $("#streamingService");

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
});
