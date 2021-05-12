console.log("Loading function");
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDB = new AWS.DynamoDB()

exports.handler = async (event) => {
	//console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env))
  //console.log('## CONTEXT: ' + serialize(context))
  //console.log('## EVENT: ' + serialize(event))
	
	var params = {
		TableName : "fcEvents",
		FilterExpression: "#event_id > :id",
		ExpressionAttributeNames: {
				"#event_id": "event_id",
		},
		ExpressionAttributeValues: {
				 ":id": {N:"0"}
		}
	};
	// Query the DynamoDB table - https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
	return await dynamoDB.scan(params).promise()
    .then((res) => {
			console.log("res: " + JSON.stringify(res))
			const events = res.Items.map((event) => {
				return{
					event_id: event.event_id.N,
					title: event.title.S,
					comments: event.comments.S,
					event_date: event.event_date.S,
					person_name: event.person_name.S
				}
			})
        return JSON.stringify(events);
    })
    .catch((err) => {
			console.log(err)
      	return err;
    });
};
var serialize = function(object) {
	return JSON.stringify(object, null, 2)
}