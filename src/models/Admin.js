import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

let {model, Schema} = mongoose;

let adminSchema = new Schema({
	name:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
})

adminSchema.statics.login = function(email, password){
	let admin;
	
	return this.findOne({email})
	.then(
		(fetchedAdmin)=>{
			if(!fetchedAdmin){
				throw new Error("Incorrect email or password");
			}

			admin = fetchedAdmin;
			return bcrypt.compare(password, admin.password)
		}
	)
	.then(
		(matched)=>{
			if(!matched){
				throw new Error("Incorrect email or password");
			}

			return admin;

		}
	)
}

let Admin = model('admin', adminSchema);

export default Admin;