class signupForm{

	constructor(formId){
		this.formId = formId
		}


	init(){

		

		//stop default form processing, in other to use AJAX.
		document.getElementById(this.formId).addEventListener("submit", function(e){

			e.preventDefault();
			//Get form values, return the values in JSON
		const formValues = {
			"Name" : $("#name").val(),
			"Password" : $("#pass").val(),
			"email" : $("#email").val(),
			"typeOfUser" : $("#typeOfUser").val()
		}

			//send the formValues to the backend s
			$.ajax({
				url : "/register",
				type : "POST",
				data : formValues,
				success : function(res){

					//Place the success response in the response box
					$("#response-box").text("Created, logging in ...");

					//Change the container color of the response box.
					$("#response-box").attr("class","btn btn-success btn-fluid");

					//redirect to the initiation area.

					window.setTimeout(function(){
						window.location = "login"
					}, 3000)

				 }

			}).fail(
			// {

			// 		//Place the success response in the response box
			// 		$("#response-box").text("An error occured, try again");

			// 		//Change the container color of the response box.
			// 		$("#response-box").attr("class","btn btn-danger btn-fluid")
			// 	}
				)
		})

	}

	
}

