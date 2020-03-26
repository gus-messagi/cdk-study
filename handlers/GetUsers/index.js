const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const cognitoAdmin = new AWS.CognitoIdentityServiceProvider();

dotenv.config();

exports.handler = async (event) => {
    const users = await cognitoAdmin.listUsers({ UserPoolId: process.env.poolId }).promise();

    return {
        statusCode: 200,
        body: users
    }
}