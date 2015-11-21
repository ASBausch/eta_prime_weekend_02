$(document).ready(function() {
  getData();
  function getData() {
    $.ajax({url:'/data/eta.json'}).done(function(students) {
      //generating a random number to choose who is viewed firstName
      //students.eta.length(length of the array in the json object) as the max
      var studentLength = students.eta.length - 1;
      var currentlyDisplayedStudent = randomNumber(0, studentLength);
      drawStudent(currentlyDisplayedStudent, students);
    });
  }

  //sets the index value of the student in the object array
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //getting json data from the server and bonding that data to the template
  function drawStudent(currentlyDisplayedStudent, students) {
    //id of the template, grabs the id and sets the source, a block of
    //html with placeholders

    var source = $('#currentStudent').html();

    //turns this block of html into a usable handlebars template
    var template = Handlebars.compile(source);

    //takes the json data and putting it all into the template
    var html = template(students.eta[currentlyDisplayedStudent]);

    //appends the paired data and template to the dom in 'section'
    $('section').html(html);
  }

});
