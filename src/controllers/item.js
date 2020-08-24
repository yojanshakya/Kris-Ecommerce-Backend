import JSONResponse from '../utils/JSONResponse'

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




