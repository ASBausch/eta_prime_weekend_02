$(document).ready(function() {
  //index of where the student we are viewing is in the json
  var currentStudentIndex;

  //this hold json object/data from getData
  var students;

  //this is the amount of students in the object/array
  var studentLength;
  /*
  *turns this block of html into a usable handlebars template,source
  *must be declared with the html id before it can be compiled by handlebars
  *the template has to be drawn before getdata because we need placeholders
  *for the data to go
  */
  var source = $('#currentStudent').html();
  var template = Handlebars.compile(source);

  //calls the ajax function to pull data from the server
  getData();

  function getData() {
    $.ajax({url:'/data/eta.json'}).done(function(data) {
      //setting data to students for access ourside of this function
      students = data;

      //firstName(length of the array in the json object) as the max
      studentLength = students.eta.length - 1;

      //generate random number to to use for starting index
      currentStudentIndex = randomNumber(0, studentLength);

      //drawStudent upon reciept of data
      drawStudent(currentStudentIndex);
    });
  }

  //standard  random number generator
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // writes data to the dom
  function drawStudent(currentStudentIndex) {

    // bind json data to template
    var html = template(students.eta[currentStudentIndex]);

    // append the templated html to dom
    $('section').html(html);
  }

  // event handler to modify currentStudentIndex and recall drawStudent
  $('.nextBtn').on('click', function() {
    currentStudentIndex = (currentStudentIndex + 1);

    // reset to index 0 if reach the end
    if (currentStudentIndex > studentLength) {
      currentStudentIndex = 0;
    }

    drawStudent(currentStudentIndex);
  });

  $('.prevBtn').on('click', function() {
    currentStudentIndex = (currentStudentIndex - 1);

    //reset to index 0 if reach the end
    if (currentStudentIndex < 0) {
      currentStudentIndex = studentLength;
    }

    drawStudent(currentStudentIndex);

  });

});
