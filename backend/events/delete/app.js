// This function DELETES an exsiting event
console.log("Loading function");
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB()

exports.handler = async (event) => {
	//console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env))
	//console.log('## CONTEXT: ' + serialize(context))
	//console.log('## EVENT: ' + serialize(event))
	
	// Grab data from request (I'm not using base64 encoding, so no need to decode)
	console.log(event)
	var eventInfo = JSON.parse(event.body)

	var params = {
		TableName: 'fcEvents',
		Key: {
			event_id: { N: eventInfo.payload.event.event_id},
			event_date: { S: eventInfo.payload.event.event_date}
		},
		"ReturnValues": "ALL_OLD"
	};
	console.log(params)
	
	// Write to the DynamoDB table - https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html
	return await dynamoDB.deleteItem(params).promise()
    .then((res) => {
			console.log("Deleted event: '" + eventInfo.payload.event.title + "' from table: " + params.TableName);
    })
    .catch((err) => {
    	console.log(err)
        return err;
    });
};
var serialize = function(object) {
	return JSON.stringify(object, null, 2)
}