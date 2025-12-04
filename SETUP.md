# 🎄 Christmas Party RSVP - Setup Guide 🎅

## Project Structure

```
inbjudan/
├── backend/          # Express + MongoDB backend
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/         # React frontend
    ├── index.html
    ├── app.js
    └── styles.css
```

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster → "Connect"
3. Choose "Drivers" → "Node.js"
4. Copy the connection string
5. Update `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/christmas-party?retryWrites=true&w=majority
PORT=3000
```

**Important:** Replace `<username>`, `<password>`, and `<cluster>` with your actual values!

#### Check Network Access:

- Go to "Network Access" in MongoDB Atlas
- Add your IP address or `0.0.0.0/0` (for testing only)

#### Option B: Local MongoDB

```bash
# Install MongoDB (macOS with Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Update backend/.env
MONGODB_URI=mongodb://localhost:27017/christmas-party
PORT=3000
```

### 3. Start Backend

```bash
cd backend
npm start
```

You should see:

```
🎄 Connected to MongoDB Atlas!
🎅 Christmas RSVP server running on port 3000
```

## Frontend Setup

### 1. Start Frontend Server

```bash
cd frontend
python3 -m http.server 8080
```

### 2. Open in Browser

Navigate to: http://localhost:8080

## Troubleshooting

### MongoDB Connection Error (ENOTFOUND)

This error means the MongoDB hostname cannot be resolved. Solutions:

1. **Check your connection string** - Make sure cluster name is correct
2. **Verify Network Access** - Add your IP in MongoDB Atlas
3. **Wait a few minutes** - New clusters need time to initialize
4. **Use local MongoDB** - See Option B above

### CORS Errors

If you see CORS errors in the browser:

- Make sure backend is running on port 3000
- Frontend should be on a different port (8080)

### API Not Responding

Check that:

- Backend is running: `http://localhost:3000/api/health`
- Frontend API_ENDPOINT points to: `http://localhost:3000/api/rsvp`

## API Endpoints

### POST `/api/rsvp`

Submit a new RSVP

**Request:**

```json
{
  "name": "Santa Claus",
  "answer": "yes"
}
```

**Response:**

```json
{
  "success": true,
  "message": "HO HO HO!!! RSVP recorded!"
}
```

### GET `/api/rsvp`

Get all RSVPs grouped by yes/no

**Response:**

```json
{
  "success": true,
  "yes": [{ "name": "Santa Claus", "createdAt": "2025-12-04T..." }],
  "no": [{ "name": "Grinch", "createdAt": "2025-12-04T..." }],
  "total": 2
}
```

### GET `/api/health`

Health check

**Response:**

```json
{
  "status": "OK",
  "message": "🎄 Server is running!"
}
```

## Deployment

### Backend (Railway, Render, Heroku)

1. Push code to GitHub
2. Connect to deployment service
3. Set environment variable `MONGODB_URI`
4. Deploy!

### Frontend (Netlify, Vercel, GitHub Pages)

1. Update `API_ENDPOINT` in `app.js` to your backend URL
2. Upload frontend folder
3. Deploy!

## Features

- ✨ Submit RSVP with name and yes/no answer
- 🎨 View all RSVPs after submitting
- 🎄 Crazy 90s Christmas styling
- 💾 Data persisted in MongoDB
- 🚫 One-time submission (no reset button after submit)

Enjoy your Christmas party! 🎅🎄
