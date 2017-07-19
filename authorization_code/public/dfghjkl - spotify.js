
	var searchText = $('#search').val();
	var boton = $("#submit");
	var resultado = $('#resultado');

	$("#submit").on("click", function(e) {
		console.log('click');
	 	
		$.ajax({
		   url: 'https://api.spotify.com/v1/search',
		   dataType: 'json',
		   data: {
		     	type: "artist",
		      	query : "beyonce"
		    },
		   headers: {
		       'Authorization': 'Bearer ' + access_token
		   },
		   success: function(response) {      
		   			console.log('Successfully done');   	
		  			resultado.load('https://api.spotify.com/v1/search?type=artist&query=beyonce',completeFunction);    
		   }
		});
	});


  	function completeFunction(responseText, textStatus, request) {
    
     	resultado.css('border', '1px solid #000');
    	console.log(request);
   
	    if(textStatus === 'error') {
	    	resultado.text('Error del GÚENOOORL ' + request.status + ' ' + request.statusText);
	    } 
	}
