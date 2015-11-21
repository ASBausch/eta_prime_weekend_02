$(document).ready(function() {

  $.ajax({url:'/data/eta.json'}).done(function(json) {
    var source = $('#currentStudent').html();
    var template = Handlebars.compile(source);
    var context = {eta:[{firstName: json, lastName: json}]};
    var html = template(context);
    $('section').html(html);
  });
});
