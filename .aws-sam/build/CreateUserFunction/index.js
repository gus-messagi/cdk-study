const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const cognitoAdmin = new AWS.CognitoIdentityServiceProvider();

dotenv.config();

const createUser = async ({ name, email }) => {
    
    const params = {
        UserPoolId: process.env.poolId,
        Username: email,
        TemporaryPassword: 'SamplePassword123!',
        DesiredDeliveryMediums: ['EMAIL'],
        UserAttributes: [
            {
                "Name": "name",
                "Value": name
            },
            {
                "Name": "email",
                "Value": email
            },
        ],
        MessageAction: 'SUPPRESS',
    };
    
    return cognitoAdmin.adminCreateUser(params).promise();
};

exports.handler = async (event) => {
    const eventParams = JSON.parse(event.body);

    try {
        const user = await createUser(eventParams);
        
        return {
            statusCode: 200,
            body: user
        }
    } catch (err) {
        console.log(err);
    }
}