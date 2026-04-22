import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function send(apigw, connectionId, data) {
  try {
    await apigw.send(new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(data)
    }));
  } catch (e) {
    // Connection may already be gone — safe to ignore
  }
}

export const handler = async (event) => {
  const { connectionId, domainName, stage } = event.requestContext;

  const connResult = await ddb.send(new GetCommand({
    TableName: 'TTT_Connections',
    Key: { connectionId }
  }));

  const conn = connResult.Item;

  if (conn?.gameId) {
    // Mark the game as abandoned
    await ddb.send(new UpdateCommand({
      TableName: 'TTT_Games',
      Key: { gameId: conn.gameId },
      UpdateExpression: 'SET #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':s': 'abandoned' }
    }));

    // Notify the other player
    const gameResult = await ddb.send(new GetCommand({
      TableName: 'TTT_Games',
      Key: { gameId: conn.gameId }
    }));

    const game = gameResult.Item;
    if (game) {
      const otherConnectionId = conn.symbol === 'X' ? game.playerO : game.playerX;
      if (otherConnectionId) {
        const apigw = new ApiGatewayManagementApiClient({
          endpoint: `https://${domainName}/${stage}`
        });
        await send(apigw, otherConnectionId, { type: 'OPPONENT_DISCONNECTED' });
      }
    }
  }

  await ddb.send(new DeleteCommand({
    TableName: 'TTT_Connections',
    Key: { connectionId }
  }));

  return { statusCode: 200 };
};
