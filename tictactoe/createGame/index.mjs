import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

function generateGameId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const handler = async (event) => {
  const { connectionId, domainName, stage } = event.requestContext;
  const gameId = generateGameId();

  await ddb.send(new PutCommand({
    TableName: 'TTT_Games',
    Item: {
      gameId,
      board: ['', '', '', '', '', '', '', '', ''],
      currentTurn: 'X',
      playerX: connectionId,
      playerO: null,
      status: 'waiting',
      winner: null
    }
  }));

  await ddb.send(new UpdateCommand({
    TableName: 'TTT_Connections',
    Key: { connectionId },
    UpdateExpression: 'SET gameId = :g, symbol = :s',
    ExpressionAttributeValues: { ':g': gameId, ':s': 'X' }
  }));

  const apigw = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`
  });

  await apigw.send(new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify({
      type: 'GAME_CREATED',
      gameId,
      symbol: 'X',
      message: `Game created! Share this ID with your opponent: ${gameId}`
    })
  }));

  return { statusCode: 200 };
};
