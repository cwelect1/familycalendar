// This function UPDATES an exsiting event
console.log("Loading function");
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB()

exports.handler = async (event) => {
	//console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env))
  //console.log('## CONTEXT: ' + serialize(context))
  //console.log('## EVENT: ' + serialize(event))
	
	// Grab data from request (I'm not using base64 encoding, so no need to decode)
	var body = JSON.parse(event.body)

	var params = {
		TableName: 'fcEvents',
		Key: {
			event_id: { N: body.event_id},
			event_date: {S : body.event_date}
		},
		"UpdateExpression": "set person_name = :person_name, title = :title, comments = :comments",
		ConditionExpression: 'attribute_exists(event_id)',
		"ExpressionAttributeValues": {
			":person_name": {"S": body.person_name},
			":title": {"S": body.title},
			":comments": {"S": body.comments}
		},
		"ReturnValues": "ALL_NEW"
	};
	
	console.log(params)
	// Write to the DynamoDB table - https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html
	return await dynamoDB.updateItem(params).promise()
    .then((res) => {
			console.log("Updated event: '" + body.title + "' to table: " + params.TableName);
    })
    .catch((err) => {
    	console.log(err)
        return err;
    });
};
var serialize = function(object) {
	return JSON.stringify(object, null, 2)
}