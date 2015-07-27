$(function() {
  // CHECK IF WE"RE CONNECTED
  console.log('I\'m here to serve')

//Define Base URL
var baseUrl = "http://localhost:3000"; 
//var baseUrl = "https://startupwdi.herokuapp.com";

//On page load, loads the empty ideas screen
$( "#ideasscreen" ).fadeIn( "slow", function() {
    // Animation complete.
});


//Define the template
$idea = _.template( $("#ideaTemplate").html() );

// Appends the list of ideas in DB onto the template 
$.get('/api/ideas', function(data) {
	var ideas = data;
	console.log("IDEAS: "+ideas);	

	_.each(ideas, function(idea) {
		console.log("IDEA: "+idea)
		$('#ideas').prepend($idea(idea))
	});

});

//Setup function to check user's login status
function setupView() {
	$.get('/api/users', function (data) {
		if(data) {
			console.log("User logged in")
			globalUserData = data;
			$('#navbar-guest').hide();
			$('#navbar-loggedin').show();
		} else {
			console.log("User logged out")
			$('#navbar-loggedin').hide();
			$('#navbar-guest').show();			
		}
	});
}  

setupView();

//Show the home screen
$( "#homenav" ).click(function() {
	console.log("Clicking home screen");
 	location.reload();
 
});

//Show the submit screen and hide everthing else
$( "#submitnav" ).click(function() {
	$( "#ideasscreen" ).hide();
	$("#playscreen").hide();
	$("#loginscreen").hide();
	$("#aboutscreen").hide();
	$( "#submitscreen" ).fadeIn( "slow", function() {

    // Animation complete.

	});
});

//Show the submit screen and hide everthing else after logged in
$( "#submitnav2" ).click(function() { 
	console.log("it worked");
	$( "#ideasscreen2" ).hide();
	$("#playscreen2").hide();
	$("#loginscreen2").hide();
	$("#aboutscreen2").hide();
	$( "#submitscreen2" ).fadeIn( "slow", function()
{

    // Animation complete.

	});
});


//Show the Play screen
$( "#playnav" ).click(function() {
	console.log("Clicking play nav");
	$( "#ideasscreen" ).hide();
	$("#aboutscreen").hide();
	$("#loginscreen").hide();
	$("#submitscreen").hide();
	$( "#playscreen" ).fadeIn( "slow", function() {

    // Animation complete.

});


});

//Show the about screen
$( "#aboutnav" ).click(function() {
	console.log("Clicking about nav");
	$( "#ideasscreen" ).hide();
	$("#playscreen").hide();
	$("#loginscreen").hide();
	$("#submitscreen").hide();
	$( "#aboutscreen" ).fadeIn( "slow", function() {

    // Animation complete.

});


});

//Show the signup screen

$( "#signupnav").click(function() {
	console.log("Clicking signup nav");
	$( "#ideasscreen" ).hide();
	$("#playscreen").hide();
	$("#submitscreen").hide();
	$("#aboutscreen").hide();
	$( "#signupscreen" ).fadeIn( "fast", function() {
	 	//animation complete
	 });
});

//Validate the user's email on signup
$("#signupform").validate({
	rules: {
		password: {
			required: true,
			minlength: 5
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		password: {
			required: "Please provide a password.",
			minlength: "Your password must be at least 5 characters long"
		}
	}


});

//Validate the user's email on login
$("#loginform").validate({
	rules: {
		password: {
			required: true,
			minlength: 5
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		password: {
			required: "Please provide a password.",
			minlength: "Your password must be at least 5 characters long"
		}
	}


});

//Allow user to signout
$( "#signoutnav").click(function() {
	console.log("Clicking signout button");
	
	 	//animation complete
	 });

//Allow user to click on ideas. Doesnt do anything
$("#ideas").click(function() {
// 	event.preventDefault();
console.log("Clicking idea");
var id = $(this).attr("data-id");
console.log(id);


});



});