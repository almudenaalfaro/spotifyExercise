//$.get("https://api.spotify.com/v1/search?type=artist&query=SEARCHTERM", character);
//al escribir en search guarde el valor 
//al pulsar submit envie el valor como orden
//solicitar info a spotify
//mostrar la info 

var searchText = "Esto es un parrafo";
function sendText (){
	$('p').text(searchText);
}

function request(){
	$.get("https://api.spotify.com/v1/search?type=artist&query=SEARCHTERM", sendText);
}




