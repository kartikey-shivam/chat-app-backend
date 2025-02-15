## Chat Application Backend
A real-time chat application backend built with Strapi and Socket.IO, enabling seamless user-server communication.

🌐 Live Demo: [Live Demo](https://chat-app-frontend-seven-theta.vercel.app/login)

## 🔗 Links
Frontend Repository: [Chat App Frontend](https://github.com/kartikey-shivam/chat-app-frontend)
Backend Deployment: [Live API](https://chat-app-backend-production-9e6f.up.railway.app/admin)

## For sample login
email : shivam301@gmail.com
password : Shivam@123

## 🚀 Features
Real-time messaging using Socket.IO
Session-based chat management
Message history tracking
User authentication
Message echo functionality
Multiple concurrent chat sessions

## 🛠️ Tech Stack
Strapi v4
Socket.IO
TypeScript
Node.js
PostgreSQL
## 📦 Installatio

1. 🏃‍♂️ Getting Started
Clone the repository:
```bash
git clone https://github.com/kartikey-shivam/chat-app-backend.git
```
2. 📦 Install Dependencies:
```bash
cd chat-app-
```
3. 🚀 Running the Application:
```bash
npm run develop
```
4. 🌐 Access the
```bash
http://localhost:1337
```
## 📡 API Endpoints
Sessions
GET /api/sessions - Get all sessions
GET /api/sessions/:id - Get specific session
GET /api/sessions/user/:userId - Get user's sessions
GET /api/sessions/:sessionId/messages - Get session messages
POST /api/sessions - Create new session

## 🔌 WebSocket Events
startSession - Initialize new chat session
sendMessage - Send message in session
messageResponse - Receive server response
sessionStarted - Session creation confirmation

📞 Support
For support, email kartikey.saraswat301@gmail.com