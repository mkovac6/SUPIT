$(function()
{
    function after_form_submitted(data) 
    {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);

        sendJSON($form.serialize());

        after_form_submitted('success');
        
      });	
});

function sendJSON(dataS){ 

    var http = new XMLHttpRequest();
    var url = 'http://www.fulek.com/VUA/SUPIT/ContactUs';
    http.open('POST', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onerror = function(){ alert ("Error"); } // failure case

    http.send(dataS);
} 