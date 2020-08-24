
export const userLoggedIn = (req, res, next)=>{

	if(!req.session.user){
		next(new Error("Not Logged In"));
		return;
	}
	
	next();
}

export const adminLoggedIn = (req, res, next)=>{

	if(!req.session.admin){
		next(new Error("Not Authorized"));
		return; 
	}

	next();

}