$(function() {
  // CHECK IF WE"RE CONNECTED
  console.log('I\'m here to serve')

//Define Base URL
 var baseUrl = "http://localhost:3000"; 
//var baseUrl = "https://startupwdi.herokuapp.com";

 $( "#ideasscreen" ).fadeIn( "slow", function() {
    // Animation complete.
  });


//Define the template
 $idea = _.template( $("#ideaTemplate").html() );

  $.get(baseUrl + '/api/ideas', function(data) {
  	var ideas = data;
  	console.log("IDEAS: "+ideas);	

	 _.each(ideas, function(idea) {
      console.log("IDEA: "+idea)
      $('#ideas').prepend($idea(idea))
    });

});
  

//Show the submit screen and hide everthing else
	
$( "#submitnav" ).click(function() {

  $( "#submitscreen" ).fadeIn( "slow", function() {
    $( "#ideasscreen" ).hide();
    $("#playscreen").hide();
    $("#loginscreen").hide();
    $("#aboutscreen").hide();
    // Animation complete.
  	
  });
});

//Show the home screen
	
$( "#homenav" ).click(function() {
	console.log("Clicking home screen");
 	location.reload();
 
  });

//Show the login screen
	
$( "#signupnav" ).click(function() {
	console.log("Clicking login screen");
	$( "#ideasscreen" ).hide();
	    $("#playscreen").hide();
	    $("#submitscreen").hide();
	    $("#aboutscreen").hide();
	$( "#loginscreen" ).fadeIn( "fast", function() {
	 	//animation complete
 	});
  });







});