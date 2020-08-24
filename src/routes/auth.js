
import express from 'express';

import JSONResponse from '../utils/JSONResponse.js'
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const authRoutes = express.Router();

//todo: use validation
//todo: messages

authRoutes.post('/signup', (req, res, next)=>{
	let {name,email, password, birthday, phNumber, permanentLocation} = req.body;

	User.signup(name,email, password, birthday, phNumber, permanentLocation)
	.then(
		(user)=>{
			console.log('heklas')
			user = user.toObject();
			delete user.password;
			res.json(new JSONResponse('success', {user}));
		}
	)
	.catch(
		(err)=>{
			
			next(err);
		}
	)
});

authRoutes.post('/login', (req, res, next)=>{
	
	let {email, password} = req.body;

	User.login(email, password)
	.then(
		(user)=>{
			user = user.toObject();
			delete user.password;

			req.session.user = user;
			res.json(new JSONResponse('success', {user}));
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)
});


authRoutes.post('/adminLogin', (req, res, next)=>{
	let {email, password} = req.body;

	Admin.login(email, password)
	.then(
		(admin)=>{
			admin = admin.toObject();
			req.session.admin = admin;
			
			delete admin.password;
			res.json(new JSONResponse('success', {admin}));
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)
})



export default authRoutes