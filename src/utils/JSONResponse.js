class JSONResponse {
	constructor(status, data){

		this.status = status;

		if(status === 'error'){
			this.message = data;
		}else{
			this.data = data;
		}
	}


}

module.exports = JSONResponse;