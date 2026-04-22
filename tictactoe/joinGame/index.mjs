import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function send(apigw, connectionId, data) {
  try {
    await apigw.send(new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(data)
    }));
  } catch (e) {
    console.error('Send failed to', connectionId, e.message);
  }
}

export const handler = async (event) => {
  const { connectionId, domainName, stage } = event.requestContext;
  const body = JSON.parse(event.body);
  const gameId = (body.gameId || '').toUpperCase().trim();

  const apigw = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`
  });

  const gameResult = await ddb.send(new GetCommand({
    TableName: 'TTT_Games',
    Key: { gameId }
  }));

  const game = gameResult.Item;

  if (!game) {
    await send(apigw, connectionId, { type: 'ERROR', message: 'Game not found. Check the ID and try again.' });
    return { statusCode: 404 };
  }

  if (game.status !== 'waiting') {
    await send(apigw, connectionId, { type: 'ERROR', message: 'That game is no longer available.' });
    return { statusCode: 400 };
  }

  if (game.playerX === connectionId) {
    await send(apigw, connectionId, { type: 'ERROR', message: 'You cannot join your own game.' });
    return { statusCode: 400 };
  }

  // Add Player O and set game active
  await ddb.send(new UpdateCommand({
    TableName: 'TTT_Games',
    Key: { gameId },
    UpdateExpression: 'SET playerO = :o, #s = :s',
    ExpressionAttributeNames: { '#s': 'status' },
    ExpressionAttributeValues: { ':o': connectionId, ':s': 'active' }
  }));

  await ddb.send(new UpdateCommand({
    TableName: 'TTT_Connections',
    Key: { connectionId },
    UpdateExpression: 'SET gameId = :g, symbol = :s',
    ExpressionAttributeValues: { ':g': gameId, ':s': 'O' }
  }));

  const baseState = {
    type: 'GAME_STARTED',
    gameId,
    board: game.board,
    currentTurn: game.currentTurn
  };

  await send(apigw, game.playerX, { ...baseState, symbol: 'X', yourTurn: true });
  await send(apigw, connectionId,  { ...baseState, symbol: 'O', yourTurn: false });

  return { statusCode: 200 };
};
