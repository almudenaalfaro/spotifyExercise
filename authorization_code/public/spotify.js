(function() {

       
        function getHashParams() {

          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');

        var oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');

        var params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
              access_token: access_token,
              refresh_token: refresh_token
            });

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  userProfilePlaceholder.innerHTML = userProfileTemplate(response);

                  $('#login').hide();
                  $('#loggedin').show();
                }
            });
          } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }

          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
        }


/*--------------------------------------------Funcion de envío y recuperación de busqueda-------------------------------------------------------*/


      var searchText = $('#search').val();
      var boton = $("#submit");
      var resultado = $('#resultado');									//Variables de enlace con los elementos

      $("#submit").on("click", function(e) {

     // $("div").empty(); 
        
        $.ajax({														//Solicitud Ajax de datos al servidor
           url 			: 'https://api.spotify.com/v1/search/?type=artist&query=' + $('#search').val(),
           dataType		: 'json',
            
           headers: {
               'Authorization': 'Bearer ' + access_token
           },
           success: printArtist
        });
      });

			function  printArtist(data) {      
                console.log('Successfully done');
                //var urlTemp = "https://api.spotify.com/v1/search"+ $('#search').val();		//Construye la url de búsqueda
                //esultado.load(urlTemp,completeFunction); 
                //var obj = $.parseJSON(dat//a);

                console.log(data);
                var artists = data.artists.items;


                artists.forEach(function(artist){
                	var row = "<tr> <td><img src='"  + artist.images[1].url + "'>      </td>  <td>"+ artist.name +" </td><td>" + artist.followers.total + " </td><td>" + artist.genres[0] + " </td></tr>";
                	$("#resultado > tbody").append(row);

                });
           }

    function completeFunction(responseText, textStatus, request) {
    
      resultado.css('border', '1px solid #000');
      console.log(request);
   
      if(textStatus === 'error') {
        resultado.text('Error del GÚENOOORL ' + request.status + ' ' + request.statusText);
      } 
  }
      })();


 

