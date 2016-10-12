
function getMovie() {
  $.ajax({
    url: 'http://localhost:9393/api/movies',
    dataType: 'json',
    success: function(data) {
      console.log('yay');
      return data;
    },
    error: function() {
      console.log('no');
    }
  });
}

$('#movieSearch').on('click', function() {
  getMovie();
  // get input on click

  // find movie title based on input

});

$('#home').on('click', function() {
  console.log("clicked on home");
});
$('#genres').on('click', function() {
  console.log("clicked on genres");
});

$('#topMovies').on('click', function() {
  $.get('/api/top_rated_movies', function(data) {
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    data.forEach(function(movieWrapper) {
      var context = {
        title: movieWrapper.movie.title,
        avgRating: movieWrapper.average_rating
      };
      var html = template(context);
      $('.content').prepend(html);
    });
  });
});
