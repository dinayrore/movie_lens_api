
(function () {

  function getMovie(movieSelection) {
    $.ajax({
      url: 'http://localhost:9393/api/movies',
      data: movieSelection,
      dataType: 'json',
      method: 'GET',

      success: function(rawData) {
        $('.content-container').empty();
        rawData.forEach(function(dataObj) {
          var movieTitle = dataObj.title.toLowerCase();
          if (movieSelection.toLowerCase() === movieTitle) {
            console.log(dataObj);
            var source = $('#movie-template').html();
            var template = Handlebars.compile(source);
            var context = {
              title: dataObj.title
            };
            var html = template(context);
            $('.content-container').prepend(html).fadeIn('slow');
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

  // Display Top Rated Movies
  $('nav').on('click', '#top-rated-movies', function() {
    updateHash('top-rated-movies');
    $('input').fadeOut();
    $('#movieSearch').fadeOut('slow');
    $('.content-container').fadeOut('slow').empty();

    $.get('/api/top_rated_movies', function(data) {
      var source = $('#top-movies-template').html();
      var template = Handlebars.compile(source);
      data.forEach(function(movieWrapper) {
        var context = {
          title: movieWrapper.movie.title,
          avgRating: movieWrapper.average_rating.toFixed(1)
        };
      var html = template(context);
      $('.content-container').prepend(html).fadeIn('slow');
      });
    });
  });
})();
