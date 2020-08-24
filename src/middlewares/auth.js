import User from "../models/User.js";
import Admin from "../models/Admin.js";

export const userLoggedIn = (req, res, next)=>{

	if(!req.user){
		next(new Error("Not Logged In"));
		return;
	}
	
	next();
}

export const adminLoggedIn = (req, res, next)=>{

	if(!req.admin){
		next(new Error("Not Authorized"));
		return; 
	}

	next();

}

export const fetchLoggedUser = (req, res, next) =>{
	if(!req.session.user){
		next();
		return;
	}

	User.findOne({_id: req.session.user._id})
	.then(
		(user)=>{
			if(!user){
				next();
				return;
			}

			req.user = user;
			next();
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)
}

export const fetchLoggedAdmin = (req, res, next) =>{
	if(!req.session.admin){
		next();
		return;
	}

	Admin.findOne({_id: req.session.admin._id})
	.then(
		(admin)=>{
			if(!admin){
				next();
				return;
			}

			req.admin = admin;
			next();
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)
}