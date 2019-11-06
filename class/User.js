const {userModel} = require("../models/UserModel.js");

class User{

	createNewUser(req,res,body){
		
		//Create a new user in the database, send response to frontend.

		const user = new userModel(body);
		user.save().then((user_details) => {
			res.send(user_details)
		}).catch((e) => {
			console.log(e)
		})
	}

	loginUser(req,res,body){

		//Get the login details from client, verify & send confirmation to client.
		userModel.findByCredentials(body.email,body.Password).then((user) => {
			
			//generate auth token for the user.
			return user.generateAuthToken().then((token) => {
				res.cookie("auth", token).cookie("email",body.email).cookie("user_id",user._id).send()
			})
		}).catch((e) => {
			console.log(e)
		})
	}
}

module.exports = {User}