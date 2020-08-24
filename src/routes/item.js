import Express from 'express';
import {postItem, getItems} from './controllers/item'
import { adminLoggedIn } from '../middlewares';

const itemRouter = Express.Router();

itemRouter.post('/item', adminLoggedIn, postItem)

itemRouter.get('/items',getItems)


export default itemRouter;