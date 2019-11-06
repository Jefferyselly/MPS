class Compiler{

	init(code){

		$(document).ready(function(){

			document.getElementById("run").addEventListener("click",function(){
				var to_compile = {
				"LanguageChoice" : getCookie("languageChoice"),
				"program" : code.getDoc.getValue()

			}

			 $.ajax ({
			        url: "https://rextester.com/rundotnet/api",
			        type: "POST",
			        data: to_compile
			    }).done(function(data) {
			        alert(JSON.stringify(data));
			    }).fail(function(data, err) {
			        alert("fail " + JSON.stringify(data) + " " + JSON.stringify(err));
		        });

		})
		})

	}

}

