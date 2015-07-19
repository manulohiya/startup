$(function() {
  // CHECK IF WE"RE CONNECTED
  console.log('I\'m here to serve')

//Define Base URL
 var baseUrl = "http://localhost:3000"; 
//var baseUrl = "https://startupwdi.herokuapp.com";

console.log(baseUrl);


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
  







});