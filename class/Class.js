const {classModel} = require("../models/classModel.js");

class Class{

	newClass(req,res,body){

		//Store class details inside the database, store the class name, language in a cookie for redirection purpose.

		const myClass = new classModel(body);

		myClass.save().then((cl) => {
			res.cookie("ed_class_title",cl.classTitle).cookie("compileLang",cl.language).cookie("ed_class_id",cl._id).send(cl);
		})

	}

	displayClass(req,res){

		//Get class from the database and display from the route.

		classModel.find().then((classes) => {

			res.render("class.ejs", {
				theClass : classes
			})
		})
	}

	manage(req,res){
		//get all the classes and display them according to the user's id.

		classModel.find({created_by_id : req.cookies["user_id"]}).then((managerDetails) => {
			
			res.render("manager.ejs",{
				managerDetails
			})
		})
	}

	classDelete(req,res,id){

		classModel.findOneAndDelete({_id : id}).then((deleted) => {
			res.send("deleted");
		})
	}

	
}

module.exports = {
	Class
}