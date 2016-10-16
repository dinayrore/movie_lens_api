
(function () {
  // Auto user
  var user = {
    id: 17,
    ratings: []
  };
  // On page load, get user's ratings
  $.ajax({
    url: '/api/ratings?user_id=' + user.id,
    dataType: 'json',
    method: 'GET',
    success: function(data) {
      user.ratings = data;
    },
    error: function() {
      console.log('ERROR = Did not get user\'s ratings');
    }
  });

  function rateMovie(movieId, rating) {
    var possibleRating = user.ratings.find(function(userRating) {
      return userRating.movie_id === Number(movieId);
    });
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": '/api/ratings' + (possibleRating ? ("/"+possibleRating.id) : ""),
      "data": {
        "user_id": 17,
        "movie_id": movieId,
        "score": rating
      },
      "dataType": 'json',
      "method": (possibleRating ? "PUT" : "POST"),
      error: function() {
        console.log('Rating Error');
      }
    };
    $.ajax(settings).done(function(response) {
      console.log("Rating sent successfully");
      console.log(movieId +  " : " + rating);
    });
  }

  $('.content-container').on('change', '#movie-rating', function() {
    console.log('rating changed');
    var movieId = $(this).attr('data-id');
    var rating = this.value;
    rateMovie(movieId, rating);
  });

  // Filter through database for searched movie title
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
            // console.log(dataObj);
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

  // Search Field - get value and call getMovie function
  $('#movieSearch').on('click', function() {
    var movieSelection = $('.searchField').val();
    getMovie(movieSelection);
  });

  // Window hash update
  function updateHash(hash) {
    window.location.hash = hash;
  }
  // Display Home page
  $('#home').on('click', function() {
    updateHash('home');
    $('.content-container').fadeOut();
    $('.content-container').empty();
    $('input').fadeIn();
    $('#movieSearch').fadeIn();
  });

  // Display User
  $('nav').on('click', '#user', function() {
    updateHash('user');
    $('input').fadeOut();
    $('#movieSearch').fadeOut();
    $('.content-container').empty().fadeOut();

    $.get('/api/users/17', function(data) {
      var source= $('#user-template').html();
      var template= Handlebars.compile(source);
      var context= {
        id: data.id,
        age: data.age,
        gender: data.gender,
        occupation: data.occupation,
        zipcode: data.zip_code
      };
      var html = template(context);
      $('.content-container').prepend(html).fadeIn('slow');
    });
  });

  // Display Top Rated Movies
  $('nav').on('click', '#top-rated-movies', function() {
    updateHash('top-rated-movies');
    $('input').fadeOut();
    $('#movieSearch').fadeOut('slow');
    $('.content-container').fadeOut('slow').empty();

    // Get top rated movies
    $.get('/api/top_rated_movies', function(data) {
      var source = $('#top-movies-template').html();
      var template = Handlebars.compile(source);
      data.forEach(function(movieWrapper) {
        var possibleRating = user.ratings.find(function(userRating) {
          return userRating.movie_id === Number(movieWrapper.movie.id);
        });
        var context = {
          title: movieWrapper.movie.title,
          avgRating: movieWrapper.average_rating.toFixed(1),
          movieId: movieWrapper.movie.id,
          score: possibleRating ? possibleRating.score : 'Rate'
        };
        var html = template(context);
        $('.content-container').prepend(html).fadeIn('slow');
      });
    });
  });
})();
