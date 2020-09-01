$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });


  $('#addShow').on('click', function () {
    $('#inputForm').empty().append(
    `
    <form>
<div class="form-group">
  <label for="movieTitle">Show Title</label>
  <input type="text" class="form-control" id="showTitle">
</div>
<form>
  <div class="form-group">
    <label for="rating">Rating(0 to 10)</label>
    <input type="range" class="form-control-range" id="rating">
  </div>
</form>
<div class="form-group">
  <label for="writeUp">Write Up (max 240 characters)</label>
  <textarea class="form-control" id="writeUp" rows="3"></textarea>
</div>
<div class="form-group">
  <label for="movieTitle">How many episodes should someone watch before giving up?</label>
  <input type="number" class="form-control" id="minEpisodes">
</div>
<div class="form-group">
  <label for="streamingService">What streaming service did you watch it on?</label>
  <select class="form-control" id="streamingService">
    <option>Netflix</option>
    <option>Hulu</option>
    <option>Amazon</option>
    <option>Apple Video</option>
    <option>Disney Plus</option>
    <option>None of the above</option>
  </select>
</div>
<div class="form-group">
  <div class="form-group">
    <label for="recommend"> Would you recommend this show?</label><br>
    <input type="radio" name="recommend" value="1" checked>Recommend<br>
    <input type="radio" name="recommend" value="0"> Do Not Recommend
  </div>
</div>
<button type="button" class="btn btn-primary" id="showSubmitButton">Submit</button>
</div>
    `
    );
    $('#showSubmitButton').on('click', function () {
      event.preventDefault();
      const title = $('#showTitle');
      const rating = $('#rating');
      const writeUp = $('#writeUp');
      const minEpisodes = $('#minEpisodes');
      const streaming = $('#streamingService');

      const newShow = {
        title: title.val().trim(),
        rating: rating.val() / 10,
        writeUp: writeUp.val().trim(),
        minEpisodes: minEpisodes.val().trim(),
        streaming: streaming.val().trim(),
        recommend: $('[name=recommend]:checked').val().trim()

      // userName: userInput.val().trim()
      };
      console.log(newShow);
      $.ajax('/api/show', {
        type: 'POST',
        data: newShow
      }).then(() => {
        location.reload();
      });
    });
  });
  $('#addMovie').on('click', function () {
    $('#inputForm').empty().append(
`
<form>
<div class="form-group">
  <label for="movieTitle">Movie Title</label>
  <input type="text" class="form-control" id="movieTitle">
</div>
<form>
  <div class="form-group">
    <label for="rating">Rating(0 to 10)</label>
    <input type="range" class="form-control-range" id="rating">
  </div>
</form>
<div class="form-group">
  <label for="writeUp">Write Up (max 240 characters)</label>
  <textarea class="form-control" id="writeUp" rows="3"></textarea>
</div>
<div class="form-group">
  <label for="streamingService">What streaming service did you watch it on?</label>
  <select class="form-control" id="streamingService">
    <option>Netflix</option>
    <option>Hulu</option>
    <option>Amazon</option>
    <option>Apple Video</option>
    <option>Disney Plus</option>
    <option>None of the above</option>
  </select>
</div>
<div class="form-group">
  <div class="form-group">
    <label for="recommend"> Would you recommend this movie?</label><br>
    <input type="radio" name="recommend" value="1" checked>Recommend<br>
    <input type="radio" name="recommend" value="0"> Do Not Recommend
  </div>
</div>
<button type="button" class="btn btn-primary" id="movieSubmitButton">Submit</button>
</div>
`);
    $('#movieSubmitButton').on('click', function () {
      event.preventDefault();
      const title = $('#movieTitle');
      const rating = $('#rating');
      const writeUp = $('#writeUp');
      const streaming = $('#streamingService');

      const newMovie = {
        title: title.val().trim(),
        rating: rating.val() / 10,
        writeUp: writeUp.val().trim(),
        streaming: streaming.val().trim(),
        recommend: $('[name=recommend]:checked').val().trim()

        // userName: userInput.val().trim()
      };
      console.log(newMovie);
      $.ajax('/api/movie', {
        type: 'POST',
        data: newMovie
      }).then(() => {
        location.reload();
      });
    });
  });
});
