var AWS = require('aws-sdk');

exports.callbackPipeline = (status, jobid,error, callback) =>{

    var codepipeline = new AWS.CodePipeline();
	console.log('comunicando estado a pipeline')
	var params = { jobId : jobid }

	if( status == OK ){

		codepipeline.putJobSuccessResult(params,function(err,data){
			if (err) console.log(err, err.stack); // an error occurred
  			else{
  				if(typeof callback !== 'undefined'){
  					callback()
  				}
  			}  
		})
	}else{
		var params = {
			jobId: jobid,
			failureDetails: { 
		      externalExecutionId: "CreateCustomEndpoint",
		      message: error,
		      type: 'JobFailed'
			}
		}

		codepipeline.putJobFailureResult(params,function(err,data){
			if (err){
			 	console.log(err, err.stack); // an error occurred
	  		}else{
	  			if(typeof callback !== 'undefined'){
	  				callback()
	  			}
	  		}     
		}) 
	}
}