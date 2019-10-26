const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.getAllItemsHandler = async (event) => {
    const { httpMethod, path } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
    }
    
    console.log('received:', JSON.stringify(event));

    const params = { TableName: tableName };
    const { Items } = await docClient.scan(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(Items),
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
};
