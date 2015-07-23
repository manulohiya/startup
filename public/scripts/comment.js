$(function() {
  // CHECK IF WE"RE CONNECTED
  console.log('I\'m here to serve on comment.js')

//Define Base URL
 var baseUrl = "http://localhost:3000"; 
//var baseUrl = "https://startupwdi.herokuapp.com";



 $( "#commentscreen" ).fadeIn( "slow", function() {
    // Animation complete.
  });

var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
console.log(id);
//Define the template
 $comment = _.template( $("#commentTemplate").html() );
 $headline = _.template( $("#headlineTemplate").html() );
 
 console.log("Finding template")
  $.get('/api/ideas/' + id, function(data) {
  	var comments = data;
//  	console.log("Comments: ",comments[0].company);	

	
 //     console.log("Comment: "+comment)
 //$comment = _.template( $("#commentTemplate").html() )
 		_.each(comments[0].comments, function(comment) {
 		console.log('hey im the indivdual comment', comment);
      $('#comments').append($comment(comment))
   });
 		var headline = {
 			company: comments[0].company,
 			market: comments[0].market,
 			desc: comments[0].desc
 		};
 	console.log(headline);	
	$('#headline').append($headline(headline));

});


//Show the submit screen and hide everthing else
$( "#submitnav" ).click(function() {
	 console.log("Submit screen triggered");
	 $( "#commentscreen" ).hide();
    
  $( "#submitscreen" ).fadeIn( "slow", function() {
   
    // Animation complete.
  	
  });
});


//Show the home screen
$( "#homenav" ).click(function() {
	console.log("Clicking home screen");
//Need to redirect to ideahunt home page
 	location.reload();
 
  });


//Logic to check for char limit on form
    $('#characterLeft').text('280 characters left');
    $('#desc').keydown(function () {
        var max = 280;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    });  


//Logic to submit form
   $('#submit').click(function(e){
     
     e.preventDefault();
     console.log("im submitting a form2")
     var newComment = {
       author: $('#author').val(),
       desc: $('#desc').val()
     };
     console.log(newComment);
      
     $.post('/api/ideas/'+id+'/comments', newComment, function(data) {
       console.log(data);
      // var ideaID = req.params.id;
      // console.log(ideaID);
       // $('#ideas').prepend($line(data))
      
       $( "#submitscreen" ).hide();
          location.reload();
          // Animation complete.
        
   
     })

   })








});