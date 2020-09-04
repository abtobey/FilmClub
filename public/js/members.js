$(document).ready(() => {
  let flip = document.querySelector(".flipCard");
  let formSwitch = $("#formSwitch");
  let playing = false;

  $("#formSwitch").on("click", function() {
    if (playing) return;
    if (formSwitch.text() === "Switch to movie form") {
      formSwitch.text("Switch to show form");
    } else {
      formSwitch.text("Switch to movie form");
    }
    playing = true;
    anime({
      targets: flip,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function(anim) {
        playing = false;
      },
    });
  });

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

  $("#movieSubmitButton").on("click", function() {
    event.preventDefault();
    const title = $("#movieTitle");
    const rating = $("#movieRating");
    const writeUp = $("#movieWriteUp");
    const streaming = $("#movieStreamingService");

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
  // });
});
