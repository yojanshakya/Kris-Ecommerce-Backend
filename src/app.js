const express = require('express');

let createApp = () => {
	let app = express();

	app.get('/hello', (req, res, next)=>{
		console.log("hello is hit");
		res.json({hello:"test"});
	})

	return app;
}

module.exports = {createApp};