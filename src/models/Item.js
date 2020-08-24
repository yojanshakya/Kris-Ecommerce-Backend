import mongoose from 'mongoose';

let {model, Schema} = mongoose;

let ItemSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 50
		},
		description: {
			type: String,
			maxlength: 200,
			default: ""
		},
		price: {
			type: Number,
			required: true
		},
		image: {
			type: String
		},
		sale: {
			type: Boolean,
			default: false
		},
		prevPrice:{
			type: Number
		}
	}
)

ItemSchema.statics.addItem = (title, price, description, image, sale, prevPrice ) => {
	return model('item').create({title, price, description, image, sale, prevPrice});
}

ItemSchema.statics.findItem = (title, price, sale) =>{
	return model('item').find({title, price, sale});
}

ItemSchema.statics.getAllItems = () => {
	return model('item').find();
}

ItemSchema.statics.deleteItem = (id)=> {
	return model('item').findByIdAndDelete(id);
}

ItemSchema.statics.updateItem = (id, title, price, description, image, sale, prevPrice) => {
	return model('item').findByIdAndUpdate(id, {title, price, description, image, sale, prevPrice});
}

const Item =  model('item', ItemSchema)

export default Item;