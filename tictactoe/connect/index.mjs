import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  const { connectionId } = event.requestContext;

  await ddb.send(new PutCommand({
    TableName: 'TTT_Connections',
    Item: { connectionId, gameId: null, symbol: null }
  }));

  return { statusCode: 200 };
};
