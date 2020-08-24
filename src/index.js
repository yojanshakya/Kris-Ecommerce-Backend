import mongoose from 'mongoose'
import mongoSession from 'connect-mongodb-session'
import session from 'express-session'

import {createApp} from './app.js'
import { MONGO_URI, MONGO_OPTIONS } from './config/db.js';

let MongoDBStore = mongoSession(session)
let store = new MongoDBStore({
	uri: MONGO_URI,
	collection: 'session'
})

let app = createApp(store);

mongoose.connect(MONGO_URI, MONGO_OPTIONS)
.then(
	()=>{
		console.log("DB initialized")
		app.listen(3000, ()=> console.log("listening"));
	}
)



