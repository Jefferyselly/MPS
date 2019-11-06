const {mongoose} = require('./../database/mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

let classSchema = new mongoose.Schema({

	classTitle : {
		type : String,
		required : true
	},
	language : {
		type : String,
		required : true
	},
	language_code : {
		type : String
	},
	created_by : {
		type : String
	},
	created_by_id : {
		type : String
	}

})


let classModel = mongoose.model('classModel',classSchema);

module.exports = {classModel}