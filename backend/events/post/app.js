console.log("Loading function");
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB()

exports.handler = async (event) => {
	//console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env))
  //console.log('## CONTEXT: ' + serialize(context))
  //console.log('## EVENT: ' + serialize(event))
	
	// Data is base64 encoded so decode here
	var body = JSON.parse(event.body)

	var params = {
		TableName: 'fcEvents',
		Item: {
			event_id: { N: body.event_id},
			person_name: { S: body.person_name},
			title: { S: body.title }, 
			comments: { S: body.comments },
			event_date: { S: body.event_date }
		}
	};

	// Write to the DynamoDB table
	return await dynamoDB.putItem(params).promise()
    .then((res) => {
			console.log("Added event: '" + body.title + "' to table: " + params.TableName);
    })
    .catch((err) => {
    	console.log(err)
        return err;
    });
};
var serialize = function(object) {
	return JSON.stringify(object, null, 2)
}