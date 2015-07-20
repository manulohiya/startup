$(document).ready(function(){ 

//Define Base URL
// var baseUrl = "http://localhost:3000"; 
var baseUrl = "https://startupwdi.herokuapp.com";



    $('#characterLeft').text('140 characters left');
    $('#desc').keydown(function () {
        var max = 140;
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


   $('#submit').click(function(e){
     
     e.preventDefault();
     console.log("im submitting a form2")
     var idea = {
       company: $('#company').val(),
       market: $('#market').val(),
       desc: $('#desc').val()
     }
     console.log(idea);
     $.post(baseUrl+ '/api/ideas', idea, function(data) {
       console.log(data)
       // $('#ideas').prepend($line(data))
       $( "#submitscreen" ).hide();
          location.reload();
          // Animation complete.
        
   
     })

   })
 });



