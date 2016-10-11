// function getMovie(){
//   $.ajax({
//     url: '/api/top_rated_movies',
//     dataType: 'json',
//     success: function() {
//       console.log(data);
//     }
//   });
// }
// getMovie();

$.get("/api/top_rated_movies", function(data) {
  console.log('load performed');
});
