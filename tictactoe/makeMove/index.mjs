import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner(board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(cell => cell !== '')) return { winner: 'draw', line: [] };
  return null;
}

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
  const { gameId, index } = body; // index: 0-8

  const apigw = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`
  });

  const gameResult = await ddb.send(new GetCommand({
    TableName: 'TTT_Games',
    Key: { gameId }
  }));

  const game = gameResult.Item;

  if (!game || game.status !== 'active') {
    await send(apigw, connectionId, { type: 'ERROR', message: 'Game is not active.' });
    return { statusCode: 400 };
  }

  const playerSymbol = game.playerX === connectionId ? 'X' : 'O';

  if (playerSymbol !== game.currentTurn) {
    await send(apigw, connectionId, { type: 'ERROR', message: 'Not your turn.' });
    return { statusCode: 400 };
  }

  if (typeof index !== 'number' || index < 0 || index > 8 || game.board[index] !== '') {
    await send(apigw, connectionId, { type: 'ERROR', message: 'Invalid move.' });
    return { statusCode: 400 };
  }

  const newBoard = [...game.board];
  newBoard[index] = playerSymbol;

  const result = checkWinner(newBoard);
  const newStatus = result ? 'finished' : 'active';
  const nextTurn = playerSymbol === 'X' ? 'O' : 'X';

  await ddb.send(new UpdateCommand({
    TableName: 'TTT_Games',
    Key: { gameId },
    UpdateExpression: 'SET board = :b, currentTurn = :t, #s = :s, winner = :w',
    ExpressionAttributeNames: { '#s': 'status' },
    ExpressionAttributeValues: {
      ':b': newBoard,
      ':t': nextTurn,
      ':s': newStatus,
      ':w': result?.winner || null
    }
  }));

  const broadcast = {
    type: 'MOVE_MADE',
    board: newBoard,
    lastMove: { index, symbol: playerSymbol },
    currentTurn: nextTurn,
    winner: result?.winner || null,
    winLine: result?.line || [],
    gameOver: !!result
  };

  await send(apigw, game.playerX, { ...broadcast, symbol: 'X', yourTurn: !result && nextTurn === 'X' });
  await send(apigw, game.playerO, { ...broadcast, symbol: 'O', yourTurn: !result && nextTurn === 'O' });

  return { statusCode: 200 };
};
