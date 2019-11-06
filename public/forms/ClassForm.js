class ClassForm{

	constructor(formId){
		this.formId = formId

	}

	init(){

		//stop default form processing, in other to use AJAX.
		document.getElementById(this.formId).addEventListener("submit", function(e){

			e.preventDefault();

			const formValues = {
				"classTitle" : $("#class-title").val(),
				"language" : $("#lang").val()

			}


			$.ajax({
				url : "/create-class",
				type : "POST",
				data : formValues,
				success : function(res){
					
					//open the create lesson model
					MicroModal.show('modal-1');
					}
			})
		})
}
}

