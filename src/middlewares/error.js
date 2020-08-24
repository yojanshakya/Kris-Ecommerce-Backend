import JSONResponse from "../utils/JSONResponse.js"

export let errorHandler = (err, req,res, next)=>{
	res.json(new JSONResponse('error', err.message))
}

export let notFound = (req, res, next)=>{
	res.json(new JSONResponse('error', "Not Found"));
}