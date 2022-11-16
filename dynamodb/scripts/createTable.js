// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.CreateTable.html

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
// Fake credentials for local DynamoDB running with docker on port 8000
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: 'http://localhost:8000'
  });
  
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'CUSTOMER_ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'CUSTOMER_ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'CUSTOMER_LIST',
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: 'NEW_AND_OLD_IMAGES'
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    // set DYNAMO_ENDPOINT=http://localhost:8000
    // dynamodb-admin
    console.log("Table Created", data);
    const { TableArn } = data.TableDescription;
    console.log(`Stream ARN: ${TableArn}`);
  }
});
