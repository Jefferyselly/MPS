const {User} = require('../models/UserModel');

function authenticate(req,res,next){
	let token = req.cookies['x-auth'];
	

	User.findByToken(token,res).then((user) => {
		if(!user){
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next();
		//res.send(user);
	}).catch((e) => {
		res.status(401).send(e);
	});


}

module.exports = {authenticate};