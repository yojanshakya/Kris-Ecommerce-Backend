const {createApp} = require('./app');


let app = createApp();

app.listen(3000, ()=> console.log("listening"));