function editor_label(){

	//if cookie does  not exist, use "SELECT LANGUAGE", else use cookie lang.

	$(document).ready(
		function(){


		if(getCookie("compileLang") != false){

		//insert lang
		document.getElementById("editorLabel").innerHTML = getCookie("compileLang") + " <i class='mr-1 fa fa-caret-down'> </i>"
	}else{
		$("#editorLabel").innerHTML = "Select Lang"
	}
		}


		)

	
}

editor_label();