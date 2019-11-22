/******** Require modules *************/
const express = require("express");
const app = express();
const body_parser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor.js');
const _ = require('lodash');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

/****** Import Classes *******/
const {User} = require("./class/User.js");
const {Class} = require("./class/Class.js");
const {Lesson} = require("./class/Lesson.js");

/******* Models ********/
const {classModel} = require("./models/classModel.js");
const {lessonModel} = require("./models/lessonModel.js");
const {UserModel} = require("./models/UserModel.js");




/*********	Use middlewares *********/
app.use(express.static( path.join(__dirname ,'public')));
app.use(cookieParser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended :  false}));

/**********Routes ****************/
app.get('/', (req,res) => {

	//check if user is already logged in
	if(req.cookies["auth"]){
		res.redirect("/init_user")
	}
		else{
			res.render("index.ejs",{

	});
		}
	
})

app.get('/register', (req,res) => {
	res.render("signup.ejs")
})
app.post('/register', (req,res) => {

	//create a new user
	let body = req.body
	//check if "typeOfUser" is a programmer or instructor, then assign numerical value.
	if(body.typeOfUser == "programmer"){
		body.levelOfUser = 0
	}else{
		body.levelOfUser = 1
	}
	
	const newUser = new User();
	newUser.createNewUser(req,res,body)

})

app.get("/login", (req,res) => {
	res.render("login.ejs")
})
app.post("/login", (req,res) => {
	//login a user
	let body = req.body;

	const myAccount = new User();
	myAccount.loginUser(req,res,body);
	
})
app.get("/instructor-panel",(req,res) => {

	let content = "";
	let code = "";

	//Check if content is to be edited, then get the required fields.

	if(req.query.id){
		//Get the content and code from database.
		lessonModel.findOne({_id : req.query.id}).then((editContent) => {
			content = editContent.lessonContent;
			code = editContent.lessonCode;
			res.cookie("compileLang", editContent.language).render("instructor-panel.ejs",{
				content,
				code
			})
		})
	}

	//check if query exists for a compile language, then proceed with creating cookie for it.
else if(req.query.compileLang){
		
		res.cookie("compileLang",req.query.compileLang).cookie("languageChoice", req.query.id).render("instructor-panel.ejs",{
			code,
			content
		})
	}
	else{

		res.render("instructor-panel.ejs",{
			code,
			content
		});
	}
	
})

app.post("/create-class", (req,res) => {

	const body = req.body;
	body.created_by_id = req.cookies["user_id"]

	//get the language code,mime and language name.
	console.log(body.language)

	const lengthOfStr = body.language.length; //Length of the string of languaged parsed.

	const posFirAmp = body.language.indexOf("&");

	
	const posLastAmp = body.language.lastIndexOf("&"); //Last position for &
	

	body.language_mime = body.language.slice(posLastAmp + 6,);
	body.language_code = body.language.slice(posFirAmp + 4,posLastAmp)
	body.language = body.language.slice(0,posFirAmp)

	const newClass = new Class();
	newClass.newClass(req,res,body);
})



app.get("/class", (req,res) => {

	//Get classes from the database.

	const classRoute = new Class;

	classRoute.displayClass(req,res);

	

})

app.get("/manage-classes", (req,res) => {

	const classmanager = new Class;

	classmanager.manage(req,res);
})

app.get("/new_lesson", (req,res) => {




	//Get the lesson details to store in database, render back the details to the new_lesson area
	
	let body = req.query; // the lesson name and description.



	 body.created_by_id = req.cookies["user_id"];
	 body.class_id = req.cookies["ed_class_id"]
	 body.language = req.cookies["compileLang"]

	 

	 //save the details to the database and render the lesson area.


	const the_lesson = new Lesson()
	the_lesson.create_lesson(req,res,body);
	
})

app.post("/saveLesson", (req,res) => {

		//save lesson, send back to client that it has been saved.
		

		const body = req.body

		const toBeSaved = new Lesson();

		toBeSaved.save_lesson(req,res,body);
})

app.get("/code-area", (req,res) => {
	

	//check if the compileLang was initiated, so that it can be set in the label & cookie.

	const lang = req.query.compileLang || false;

	if(lang != false){

		res.cookie("compileLang", lang).cookie("languageChoice", req.query.id).cookie("mime",req.query.mime).render("code-area.ejs")
	}else{
		res.render("code-area.ejs")	
	}


	
})

app.get("/list_lessons", (req,res) => {

	const class_id = req.query.id;

	const the_lesson = new Lesson()

	the_lesson.list_lesson(req,res,class_id)
	
})

app.get("/startLesson", (req,res) => {

	const lesson_id = req.query.id;

	const start_lesson = new Lesson();

	start_lesson.start(req,res,lesson_id)
})

app.get("/additions", (req,res) => {

	const classQuery = req.query.id || false

	if(classQuery != false){


		const addition = new Lesson;

		addition.additions(req,res,classQuery);
	}else{
		
		const addition = new Lesson();

	addition.additions_only(req,res);
	}
	
	
})
app.post("/delete", (req,res) => {
	const deletion = new Lesson();

	const body = _.pick(req.body,["id"]);

	
	deletion.additionsDelete(req,res,body.id)
})

app.post("/deleteClass", (req,res) => {

		const deletion = new Class();

	const body = _.pick(req.body,["id"]);

	
	deletion.classDelete(req,res,body.id)

})

app.get("/init_user", (req,res) => {

	res.render("init_user.ejs");
})


/**********Listen PORT ***************/
app.listen(port, function (){
    console.log('Web served on port 3000');
});