const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const { v4 } = require('uuid');
const dynamodb = new AWS.DynamoDB();

dotenv.config();

const postMessage = (message) => {
    const params = {
        Item: {
            "id": {
                S: v4()
            },
            "message": {
                S: "message here",
            },
            "user_id": {
                S: "12345"
            },
        },
        ReturnConsumedCapacity: 'TOTAL',
        TableName: 'CdkMessagesTable',
    }

    return dynamodb.putItem(params).promise();
}

exports.handler = async (event) => {
    const messageFromUser = JSON.parse(event.body);
    const insertedMessage = await postMessage(messageFromUser);
    console.log(insertedMessage);

    return {
        statusCode: 200,
        body: "Inseriu"
    }

}