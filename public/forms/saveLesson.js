class saveLesson{

	init(){

		//get the required details from the files.
		document.getElementById("saveLesson").addEventListener("click", function(e){

			start_preloader()


				const formValues = {

			"lessonContent" : $("#lessonEditor").val(),
			"lessonCode" : code.getValue()

		}

		

		

		
		

		$.ajax({

			url : "/saveLesson",
			type : "POST",
			data : formValues,
			success : function(res){

				stop_preloader();
				
				$("#progress_btn2").innerHTML = "done"
				
			}
		})
		})

		
	}
}