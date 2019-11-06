const {mongoose} = require('./../database/mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({

	Name : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	Password : {
		type : String,
		required : true
	},
	typeOfUser : {
		type : String,
		required : true
	},
	levelOfUser : {
		type : Number,
		required : true
	},
	tokens : [
	{
		access : {
			type : String,
			
		},
		token : {
			type : String,
			
		}
	}]

})

//Generate New Login Token
userSchema.methods.generateAuthToken = function(){
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id : user._id.toHexString(),
		access
	}, 'zym321');

	user.tokens.push({token, access});

	return user.save().then(() => {
		return token;
	});
}

//Hash User Passwords
userSchema.pre('save', function (next){
		let user = this;

		if(user.isModified('Password')){
			bcrypt.genSalt(10).then((salt) => {
				bcrypt.hash(user.Password, salt).then((hash) => {
					user.Password = hash;
					next();
				})
			}).catch((e) => {
				next({promise : "Promised error"});
			})
		}else{
			next();
		}
	});

//Find User when login in
userSchema.statics.findByCredentials = function(email,password){

		let User = this;
		

		return User.findOne({email}).then((user) => {
			if(!user){
				return false;
			}
			return bcrypt.compare(password, user.Password).then((res) => {
				return res ? user : false;
			});
		});
	}

userSchema.statics.findByToken = function(token,res){
		let User = this;
		console.log(token);
		let decoded;

		try{
			decoded = jwt.verify(token, 'zym321');
			
		}catch(e){
			//throw a rejection promise

			return res.redirect('/signin')
		}

		return User.findOne({
			"_id" : decoded._id,
			"tokens.access" : "auth",
			"tokens.token" : token
		});
	}

let userModel = mongoose.model('userModel',userSchema);

module.exports = {userModel}