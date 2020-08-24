import Express from 'express';
import {postItem, getItems, deleteItem, updateItem} from '../controllers/item.js'
import { adminLoggedIn } from '../middlewares/index.js';

const itemRouter = Express.Router();

itemRouter.post('/item', adminLoggedIn, postItem)

itemRouter.get('/items',getItems)

itemRouter.delete('/item/:id', adminLoggedIn, deleteItem)

itemRouter.patch('/item/:id', adminLoggedIn, updateItem)




export default itemRouter;