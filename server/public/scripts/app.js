$(document).ready(function() {
  var currentStudentIndex;
  var students;
  var studentLength;

  /*
  * var source = $('#currentStudent').html();
  * turns this block of html into a usable handlebars template
  */
  var source = $('#currentStudent').html();

  /*
  turns this block of html into a usable handlebars template,
  this has to be drawn before getdata because we need a placeholders
  for the data to go
  */
  var template = Handlebars.compile(source);

  getData();

  function getData() {
    $.ajax({url:'/data/eta.json'}).done(function(data) {
      //setting data to students for access ourside of this function
      students = data;
      /*
      * generating a random number to choose who is viewed firstName
      * students.eta.length(length of the array in the json object) as the max
      */
      studentLength = students.eta.length - 1;
      currentStudentIndex = randomNumber(0, studentLength);

      //calls drawStudent right away
      drawStudent(currentStudentIndex);
    });
  }

  //sets the index value of the student in the object array
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //getting json data at the currentStudentIndex from the server and bonding that data to the template
  function drawStudent(currentStudentIndex) {
    //id of the template, grabs the id and sets the source, a block of
    //html with placeholders

    //takes the json data and putting it all into the template
    var html = template(students.eta[currentStudentIndex]);

    //appends the paired data and template to the dom in 'section'
    $('section').html(html);
  }

  //event handler on button click modify current student index and recall drawStudent
  $('.nextBtn').on('click', function() {
    console.log("next click" + currentStudentIndex);
    currentStudentIndex = (currentStudentIndex + 1);
    if (currentStudentIndex > studentLength) {
      currentStudentIndex = 0;
    }

    drawStudent(currentStudentIndex);
  });

  $('.prevBtn').on('click', function() {
    console.log("previous click" + currentStudentIndex);
    currentStudentIndex = (currentStudentIndex - 1);
    if (currentStudentIndex < 0) {
      currentStudentIndex = studentLength;
    }

    drawStudent(currentStudentIndex);
  });

});
