
(function () {

function getMovie(movieSelection) {
  $.ajax({
    url: 'http://localhost:9393/api/movies',
    data: movieSelection,
    dataType: 'json',
    method: 'GET',
    success: function(rawData) {
      rawData.forEach(function(dataObj) {
        var movieTitle = dataObj.title.toLowerCase();
        if (movieSelection === movieTitle) {
          console.log("SUCCESS!");
        }
      });
    },
    error: function() {
      console.log('no');
    }
  });
}

$('#movieSearch').on('click', function() {
  var movieSelection = $('.searchField').val();
  getMovie(movieSelection);
});

  function updateHash(hash) {
    window.location.hash = hash;
  }

  $('#home').on('click', function() {
    updateHash('home');
    $('.content-container').fadeOut();
    $('input').fadeIn();
    $('#movieSearch').fadeIn();
  });

  $('#genres').on('click', function() {
    updateHash('genres');

  });


  $('nav').on('click', '#top-rated-movies', function() {
    updateHash('top-rated-movies');


    $.get('/api/top_rated_movies', function(data) {
      console.log(data);
      var source = $('#top-movies-template').html();
      var template = Handlebars.compile(source);

      data.forEach(function(movieWrapper) {
        var context = {
          title: movieWrapper.movie.title,
          avgRating: movieWrapper.average_rating.toFixed(1)
        };

        var html = template(context);
        console.log(data);

        $('input').fadeOut();
        $('#movieSearch').fadeOut('fast');
        $('.content-container').prepend(html).fadeIn('slow');

      });
    });
  });

})();
