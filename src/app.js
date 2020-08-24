import express from 'express'
import dotEnv from 'dotenv'
import authRoutes from './routes/auth.js';
import session from 'express-session';
import { SESSION_OPTIONS } from './config/session.js';



dotEnv.config()
export const createApp = (sessionStore) => {
	let app = express();
	app.use(express.json());

	app.use(session({...SESSION_OPTIONS, sessionStore}))

	app.use('/auth', authRoutes)
	
	app.get('/test', (req, res, next)=>{
		console.log(req.session);
	})

	app.use((err, req,res, next)=>{
		console.log('error midleware', err.message)
	})

	return app;
}



