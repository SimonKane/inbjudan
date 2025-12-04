# 🎄 Christmas Party RSVP 🎅

A gloriously retro 90s-themed Christmas party RSVP page with neon colors, spinning elements, and pure nostalgia!

## Features

- 🎄 Christmas-themed 90s styling
- ✨ Blinking, spinning, and animated elements
- 🌈 Clashing neon colors (red, green, gold, white)
- 📝 Simple form: Name + Yes/No buttons
- 👥 View all RSVPs after submitting
- 💾 MongoDB Atlas database
- ⚡ Built with React and Express

## Project Structure

```
inbjudan/
├── backend/          # Express + MongoDB backend
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/         # React frontend
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── vercel.json       # Vercel deployment config
```

## Local Development

### 1. Start Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on http://localhost:3000

### 2. Start Frontend

```bash
cd frontend
python3 -m http.server 8080
```

Frontend runs on http://localhost:8080

## Deploy to Vercel

### Quick Deploy (Recommended)

```bash
# From root directory
vercel
```

Follow the prompts:

- Link to existing project? **N**
- Project name? `christmas-party-rsvp`
- Directory? `./`
- Override settings? **N**

### Set Environment Variables

```bash
vercel env add MONGODB_URI
```

Paste your MongoDB connection string, then select **Production, Preview, Development**

### Deploy to Production

```bash
vercel --prod
```

Done! Your app is live! 🎉

## MongoDB Setup

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Add database user (Database Access)
4. Whitelist IP `0.0.0.0/0` (Network Access)
5. Get connection string from "Connect" → "Drivers"
6. Add to `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
PORT=3000
```

## API Endpoints

### POST `/api/rsvp`

Submit RSVP

**Request:**

```json
{
  "name": "Santa Claus",
  "answer": "yes"
}
```

### GET `/api/rsvp`

Get all RSVPs

**Response:**

```json
{
  "success": true,
  "yes": [{ "name": "Santa", "createdAt": "..." }],
  "no": [{ "name": "Grinch", "createdAt": "..." }],
  "total": 2
}
```

Enjoy your Christmas party! 🎄🎅
