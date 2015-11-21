$(document).ready(function() {
  var currentStudent = Handlebars.compile($('.studentList').html());
  $.ajax({ url: '/public/data/eta.json'}).done(function(json) {
    var compiledHtml = currentStudent({firstName: json, lastName: json, favoriteMovies: json });
    $('section').html(compiledHtml);
  });

//  var previousStudent = Handlebars.compile($('.previousStudent').html());
//  $.ajax({ url: '/data/eta.json'}).done(function(json) {
//    var compiledHtml = previousStudent({firstName: json, lastName: json, favoriteMovies: json });
//    $('section').html(compiledHtml);
//  });


});
