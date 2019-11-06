class loginForm{
	
	//this class handles logging in of members into the website.

	constructor(formId){
		this.formId = formId;
	}

	init(){

		//stop the webpage from loading, use ajax to handle request and response.

		document.getElementById(this.formId).addEventListener("submit",function(e){

			//Get the form details, send to the backend for confirmation
			e.preventDefault();

			const formValues = {
				"email" : $("#email").val(),
				"Password" : $("#your_pass").val()
			}

			$.ajax({
				url : "login",
				type : "POST",
				data : formValues,
				success : function(res){

					//Place the success response in the response box
					$("#response-box").text("Account Confirmed. logging in...");

					//Change the container color of the response box.
					$("#response-box").attr("class","btn btn-success btn-fluid")


					//redirect to the initiation area.

					window.setTimeout(function(){
						window.location = "init_user"
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