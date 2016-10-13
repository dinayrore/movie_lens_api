
(function getMovie() {
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


// $('#movieSearch').on('click', function() {
//   getMovie();
  // get input on click
  // find movie title based on input
// });

  function updateHash(hash) {
    window.location.hash = hash;
  }

  $('#home').on('click', function() {
    updateHash('home');

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

        $('input').fadeOut();
        $('#movieSearch').fadeOut('fast');
        $('.content-container').prepend(html).fadeIn('slow');

      });
    });
  });

})();
