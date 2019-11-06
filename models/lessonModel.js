const {mongoose} = require('./../database/mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

let lessonSchema = new mongoose.Schema({

	lessonTitle : {
		type : String,
		required : true
	},
	lessonContent : {
		type : String
	},
	lessonCode : {
		type : String
	},
	language_code : {
		type : String
	},
	language : {
		type : String,
		required : true
	},
	created_by_id : {
		type : String
	},
	lessonDescription : {
		type : String
	},
	class_id : {
		type : String
	}

})


let lessonModel = mongoose.model('lessonModel',lessonSchema);

module.exports = {lessonModel}