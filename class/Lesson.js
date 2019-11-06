const {classModel} = require("../models/classModel.js");
const {lessonModel} = require("../models/lessonModel.js");

class Lesson{

	create_lesson(req,res,body){
		//controls the route to edit lessons.

			let lsn = new lessonModel(body);

			lsn.save().then((the_lsn) => {
						
				res.cookie("lessonId",the_lsn._id).redirect("/instructor-panel")
			})

	}

	save_lesson(req,res,body){

					//save already created lessons.
			lessonModel.findOneAndUpdate({_id : req.cookies["lessonId"]},{$set : body}).then(( saved) => {
				res.send(saved);
				
			}).catch((e) => {
				console.log(e)
			})
	}

	list_lesson(req,res,classid){

		//get the id of the class => lesson, display lessons.

		lessonModel.find({class_id : classid}).then((lessons) => {{

			res.render("list_lessons.ejs", {
				lessons
			})
		}})
	}

	start(req,res,lessonid){
		lessonModel.findOne({_id : lessonid}).then((startLesson) => {

			res.cookie("compileLang",startLesson.language).render("lesson.ejs", {
				startLesson
			})
		})
	}

	additions_only(req,res){


		lessonModel.find({created_by_id : req.cookies["user_id"]}).then((additions) => {
			res.render("additions.ejs", {
				additions
			})
		})
	}

	additions(req,res,id){
		lessonModel.find({class_id : id}).then((additions) => {
			res.render("additions.ejs", {additions})
		})
	}

	additionsDelete(req,res,id){
		lessonModel.findOneAndDelete({_id : id}).then((deleted) => {
			res.send("deleted");
		})
	}
	
	
}



module.exports = {
	Lesson
}