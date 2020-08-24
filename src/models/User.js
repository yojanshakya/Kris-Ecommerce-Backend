import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { BCRYPT_SALT_ROUNDS } from '../config/auth.js'

let {model, Schema, SchemaTypes} = mongoose;

let cartSchema = new Schema({
	items:[
		{
			item: {type: SchemaTypes.ObjectId, ref:'items'},
			quantity: {type: Number, default: 1},

		}
	],
	totalPrice: {
		type: Number,
		default:0
	}
})

let userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email:{
		type:String,
		minlength: 3,
		maxlength: 30
	},
	password:{
		type: String,
		minlength: 6,
	},
	birthday: {
		type: Date,
		required: true
	},
	phNumber: {
		type: Number,
		required: true,
	},
	permanentLocation: {
		type: String,
	},
	cart:{
		type: cartSchema,
		default: {
			items:[],
			totalPrice: 0
		}
	}
	
})

userSchema.statics.signup = function(name,email, password, birthday, phNumber, permanentLocation){
	console.log("signup ")
	return this.findOne({email})
	.then(
		(user)=>{
			if(user){
				console.log('user model line 84 error')
				throw new Error("Email already used");
			}
			return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
		}
	)
	.then(
		(hashedPassword)=>{
			return model('user').create({
				name, email, password: hashedPassword , birthday, phNumber, permanentLocation
			})
		}
	)
}

userSchema.statics.login = function(email, password){

	let user;

	return this.findOne({email})
	.then(
		(foundUser)=>{
			if(!foundUser){
				console.log('user model line 84 error')
				throw new Error('User doesnt exist');
			}

			user = foundUser;
			return bcrypt.compare(password, user.password)
		}
	)
	.then(
		(passwordMatched)=>{
			if(!passwordMatched){
				throw new Error('Password doesnt match');
			}

			return user;
		}
	)
}

let User = model('user', userSchema);

export default User;