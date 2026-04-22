# Tic-Tac-Toe on AWS — Step-by-Step Setup Guide

---

## Overview

| Phase | Service | Time |
|-------|---------|------|
| 1 | DynamoDB — create tables | ~5 min |
| 2 | IAM — create Lambda role | ~5 min |
| 3 | Lambda — deploy 5 functions | ~20 min |
| 4 | API Gateway — WebSocket API | ~10 min |
| 5 | S3 + CloudFront — host frontend | ~10 min |
| 6 | Frontend — update config & upload | ~5 min |

Total: ~55 minutes

---

## Phase 1: DynamoDB Tables

Go to: **AWS Console → DynamoDB → Tables → Create table**

### Table 1: TTT_Games

| Field | Value |
|-------|-------|
| Table name | `TTT_Games` |
| Partition key | `gameId` (String) |
| Table class | DynamoDB Standard |
| Capacity mode | **On-demand** (pay-per-request — cheapest for low traffic) |

Click **Create table**.

### Table 2: TTT_Connections

| Field | Value |
|-------|-------|
| Table name | `TTT_Connections` |
| Partition key | `connectionId` (String) |
| Capacity mode | **On-demand** |

Click **Create table**.

---

## Phase 2: IAM Role for Lambda

Go to: **AWS Console → IAM → Roles → Create role**

1. Select **AWS service** → **Lambda** → Next
2. Add these managed policies:
   - `AmazonDynamoDBFullAccess`
   - `AmazonAPIGatewayInvokeFullAccess`
   - `AWSLambdaBasicExecutionRole`
3. Role name: `ttt-lambda-role`
4. Click **Create role**

> Note: For production you'd scope these down to specific ARNs,
> but this gets you running quickly.

---

## Phase 3: Lambda Functions

Go to: **AWS Console → Lambda → Functions → Create function**

Repeat these steps for ALL 5 functions. Settings are the same for each:

### Common settings for every function:

| Setting | Value |
|---------|-------|
| Runtime | Node.js 20.x |
| Architecture | x86_64 |
| Execution role | Use existing role → `ttt-lambda-role` |

### The 5 functions to create:

| Function name | File to upload |
|--------------|----------------|
| `ttt-connect` | `connect/index.mjs` |
| `ttt-disconnect` | `disconnect/index.mjs` |
| `ttt-createGame` | `createGame/index.mjs` |
| `ttt-joinGame` | `joinGame/index.mjs` |
| `ttt-makeMove` | `makeMove/index.mjs` |

### For each function:

1. After creating, go to the **Code** tab
2. Click **Upload from** → **.zip file**
   - OR paste the code directly into the inline editor
     (rename the file to `index.mjs` in the editor)
3. Make sure the **Handler** is set to `index.handler`
   (Configuration → General configuration → Edit)

### Timeout setting (important):

Go to **Configuration → General configuration → Edit**
- Set timeout to **10 seconds** (default 3s is too short for DynamoDB + API GW calls)

---

## Phase 4: API Gateway WebSocket API

Go to: **AWS Console → API Gateway → Create API**

1. Choose **WebSocket API** → Build
2. API name: `ttt-websocket`
3. Route selection expression: `$request.body.action`
4. Click **Next**

### Add Routes:

Click **Add route** for each of the following:

| Route key | Integration | Lambda function |
|-----------|------------|-----------------|
| `$connect` | Lambda | `ttt-connect` |
| `$disconnect` | Lambda | `ttt-disconnect` |
| `createGame` | Lambda | `ttt-createGame` |
| `joinGame` | Lambda | `ttt-joinGame` |
| `makeMove` | Lambda | `ttt-makeMove` |

For each route:
1. Click **Add integration**
2. Select **Lambda function**
3. Choose the correct function from the dropdown
4. ✅ Check **Grant API Gateway permission to invoke Lambda**

### Deploy the API:

1. Click **Deploy API** (top right)
2. Stage name: `production`
3. Click **Deploy**

### Copy your WebSocket URL:

After deployment, you'll see a **WebSocket URL** like:
```
wss://abc123xyz.execute-api.us-east-1.amazonaws.com/production
```

**Save this URL** — you'll need it in Phase 6.

### Enable Lambda permissions for broadcasting:

Your Lambda functions call back to API Gateway to broadcast moves.
Go to each function → **Configuration → Permissions** and verify the
`ttt-lambda-role` appears. Then:

1. Go to **IAM → Roles → ttt-lambda-role**
2. Confirm `AmazonAPIGatewayInvokeFullAccess` is attached

---

## Phase 5: S3 + CloudFront

### Create S3 Bucket:

Go to: **AWS Console → S3 → Create bucket**

| Setting | Value |
|---------|-------|
| Bucket name | `ttt-game-frontend` (must be globally unique — add your initials) |
| Region | Same as your Lambda/API GW region |
| Block all public access | **Leave CHECKED** (CloudFront will handle access) |

Click **Create bucket**.

### Create CloudFront Distribution:

Go to: **AWS Console → CloudFront → Create distribution**

| Setting | Value |
|---------|-------|
| Origin domain | Select your S3 bucket from the dropdown |
| Origin access | **Origin access control (OAC)** — recommended |
| Create new OAC | Click **Create new OAC** → Create |
| Default root object | `index.html` |
| Price class | **Use only North America and Europe** (cheapest) |

Click **Create distribution**.

After creation, CloudFront will show a banner:
> "The S3 bucket policy needs to be updated"

Click **Copy policy** → go to your S3 bucket → **Permissions → Bucket policy** → paste and save.

### Note your CloudFront domain:

It will look like: `d1abc2def3gh4i.cloudfront.net`
This is your game's public URL.

---

## Phase 6: Update Frontend & Upload

### Update the WebSocket URL in index.html:

Open `frontend/index.html` and find line ~220:

```javascript
const WS_URL = 'wss://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/production';
```

Replace with your actual WebSocket URL from Phase 4.

### Upload to S3:

1. Go to **S3 → your bucket → Upload**
2. Upload `frontend/index.html`
3. Keep all default settings → click **Upload**

### Test it:

Open your CloudFront URL in two different browser tabs (or
one on mobile, one on desktop) and play a game.

> Note: CloudFront can take 5-15 minutes to deploy on first creation.
> You can test immediately using the S3 URL while waiting:
> Go to S3 → your bucket → index.html → Object URL (but this
> requires temporarily enabling public access on the bucket).

---

## Troubleshooting

### WebSocket won't connect
- Check the WS_URL in index.html is correct
- Verify the API Gateway stage is `production`
- Check Lambda functions have the correct handler: `index.handler`

### "Game not found" error when joining
- Make sure both players are using the same region
- Check DynamoDB → TTT_Games → confirm game was created

### Moves not appearing on other player's screen
- This is usually an IAM issue. Confirm `ttt-lambda-role`
  has `AmazonAPIGatewayInvokeFullAccess`
- Check Lambda CloudWatch logs:
  Lambda → your function → Monitor → View CloudWatch logs

### CloudFront showing old version after upload
- Go to CloudFront → your distribution → Invalidations
- Create invalidation → path: `/*`

---

## Estimated Monthly Cost at Hobby Scale

| Service | Free Tier | Estimated cost |
|---------|-----------|---------------|
| Lambda | 1M invocations/month free | $0 |
| DynamoDB | 25 GB + 200M requests free | $0 |
| API Gateway WebSocket | 1M messages free | ~$0–$1 |
| S3 | 5 GB + 20K requests free | $0 |
| CloudFront | 1 TB transfer free | $0 |
| **Total** | | **~$0–$1/month** |

---

## Next Steps (when you're ready to expand)

- Add a **game lobby** listing open games (DynamoDB scan + broadcast)
- Add **player names** stored in DynamoDB on connect
- Add **rematch** flow (new game with same players, no need to re-share code)
- Add **auth** with Amazon Cognito (optional but good for persistence)
- Add **leaderboard** using a DynamoDB GSI
