$(document).ready(function() {
  //sets the index value of the student in the object array
  var currentlyDisplayedStudent = 0;
  drawStudent();

  //getting json data from the server and bonding that data to the template
  function drawStudent() {
    $.ajax({url:'/data/eta.json'}).done(function(json) {
    //id of the template, grabs the id and sets the source, a block of
    //html with placeholders
    var source = $('#currentStudent').html();

    //turns this block of html into a usable handlebars template
    var template = Handlebars.compile(source);

    //takes the json data and putting it all into the template
    var html = template(json.eta[currentlyDisplayedStudent]);

    //appends the paired data and template to the dom in 'section'
    $('section').html(html);
  });
  }
});
