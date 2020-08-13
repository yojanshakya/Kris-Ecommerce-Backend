const router = require('express').Router();

const Item = require('../models/Item');
const JSONResponse = require('../utils/JSONResponse');


router.post('/createItem', (req, res, next)=>{
	
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
		
	});;
} )