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

export default JSONResponse