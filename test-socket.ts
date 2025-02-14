// import { io } from "socket.io-client";

// const testWebSocket = () => {
//   const socket = io("http://localhost:1337", {
//     path: "/socket.io/chat"
//   });

//   const sessionId = "test-session-123";
//   const userId = "test-user-123";

//   // Connection listeners
//   socket.on("connect", () => {
//     console.log("✅ Connected to WebSocket server");
    
//     // Start session after connection
//     socket.emit("startSession", {
//       content: "hi",
//       userId,
//       sessionId
//     });
//   });

//   socket.on("sessionStarted", (data) => {
//     console.log("✅ Session started:", data);
    
//     // Send test message
//     socket.emit("sendMessage", {
//       content: "Test message 1",
//       userId,
//       sessionId
//     });
//   });

//   socket.on("messageResponse", (data) => {
//     console.log("📩 Message response:", data);
    
//     // Send another test message
//     setTimeout(() => {
//       socket.emit("sendMessage", {
//         content: "Test message 2",
//         userId,
//         sessionId
//       });
//     }, 1000);
//   });

//   socket.on("error", (error) => {
//     console.log("❌ Error:", error);
//   });
// }

// testWebSocket();
