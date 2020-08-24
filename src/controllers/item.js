import JSONResponse from '../utils/JSONResponse.js'
import Item from '../models/Item.js';


export let postItem = (req, res, next)=>{
	
	let {title, price, description, image, sale, prevPrice} = req.body;
	
	Item.addItem(title, price, description, image, sale, prevPrice)
	.then(
		(item) => {
			res.json(new JSONResponse('success', {
				item
			}))
		}
	)
	.catch(
		(err) => {
			console.log(err.stack);
			next(err);
	});;
};

export let getItems = (req, res, next)=>{
	Item.getAllItems()
	.then(
		(items)=>{
			res.json(new JSONResponse('success', {
				items
			}))
		}
	)
	.catch(
		(err)=>{
			console.log(err.stack);
			next(err);
		}
	)
}

export let deleteItem = (req, res, next) =>{

	let id = req.params['id'];

	Item.findOneAndDelete({_id: id})
	.then(
		(result)=>{
			if(!result){
				res.json(new JSONResponse("error", "Item doesn't exist"))
			}
			res.json(new JSONResponse('success', {message: "Successfully deleted item"}))
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)
}

export let updateItem = (req, res, next) =>{

	let {title, price, description, image, sale, prevPrice} = req.body;
	let {id} = req.params;

	Item.updateOne({_id: id}, {title, price, description, image, sale, prevPrice})
	.then(
		(updateInfo)=>{
			
			if(updateInfo.n>0){
				res.json(new JSONResponse('success', {message:"successfull updated"}))
				return;
			}

			res.json(new JSONResponse('error', 'Item not found or counld modify'))
		}
	)
	.catch(
		(err)=>{
			next(err);
		}
	)


	

}




