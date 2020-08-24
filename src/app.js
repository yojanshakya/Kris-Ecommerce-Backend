import express from 'express'
import dotEnv from 'dotenv'
import authRoutes from './routes/auth.js';
import session from 'express-session';
import { SESSION_OPTIONS } from './config/session.js';
import itemRouter from './routes/item.js';
import { errorHandler, notFound } from './middlewares/index.js';
import { fetchLoggedAdmin, fetchLoggedUser } from './middlewares/index.js';



dotEnv.config()
export const createApp = (sessionStore) => {
	let app = express();
	app.use(express.json());

	app.use(session({...SESSION_OPTIONS, store: sessionStore}))

	app.use(fetchLoggedAdmin);
	app.use(fetchLoggedUser);

	app.use('/auth', authRoutes)
	app.use(itemRouter);
	
	app.get('/test', (req, res, next)=>{
		console.log(req.session);
	})

	app.use(errorHandler)
	app.use(notFound)

	return app;
}



