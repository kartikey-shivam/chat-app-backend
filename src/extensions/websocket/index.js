const WebSocket = require('ws');
const { sanitizeEntity } = require('strapi-utils');

module.exports = (strapi) => {
  // Create WebSocket server attached to Strapi's HTTP server
  console.log('WebSocket extension is initializing...');

  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websocket'
  });

  // Handle HTTP upgrade requests
  strapi.server.httpServer.on('upgrade', (request, socket, head) => {
    console.log('Received an upgrade request:', request.url);
    
    if (request.url === '/websocket') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        console.log('WebSocket connection upgraded');
        wss.emit('connection', ws, request);
      });
    } else {
      console.log('Invalid WebSocket path:', request.url);
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    
    ws.on('message', async (message) => {
      try {
        const { jwt, content, sessionId } = JSON.parse(message);
        
        // Verify JWT
        const user = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);
        if (!user) throw new Error('Unauthorized');

        // Create message
        const created = await strapi.entityService.create('api::message.message', {
          data: {
            content,
            sender: 'user',
            session: sessionId
          }
        });

        // Send response
        ws.send(JSON.stringify({
          ...sanitizeEntity(created, { model: strapi.models.message }),
          sender: 'server'
        }));

      } catch (error) {
        ws.send(JSON.stringify({ error: error.message }));
        ws.close();
      }
    });
  });

  console.log('WebSocket server initialized on path /websocket');
};
