import { Server } from 'socket.io';

interface MessageData {
  content: string;
  userId: string;
  sessionId: string;
}

export default {
  register({ strapi }: { strapi: any }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      },
      path: '/socket.io/chat'
    });

    io.on('connection', (socket) => {
      console.log('New chat connection established');

      socket.on('startSession', async (data: MessageData) => {
        try {
          const session = await strapi.entityService.create('api::session.session', {
            data: {
              sessionId: data.sessionId,
              user: data.userId,
            }
          });

          const message = await strapi.entityService.create('api::message.message', {
            data: {
              content: 'Hi!',
              message_from: data.userId,
              message_type: 'user',
              sessionId:data.sessionId,
            }
          });
          socket.emit('sessionStarted', { content: "Hi!", message_from:"Server", message_type: "server",sessionId: data.sessionId });
        } catch (error) {
          socket.emit('error', { message: 'Failed to start session', error: error.message });
        }
      });

      socket.on('sendMessage', async (data: MessageData) => {
        try {
          // Create user message
          const userMessage = await strapi.entityService.create('api::message.message', {
            data: {
              content: data.content,
              message_from: data.userId,
              message_type: 'user',
              session: data.sessionId,
              publishedAt: new Date()
            }
          });

          // Create server response message
          const serverMessage = await strapi.entityService.create('api::message.message', {
            data: {
              content: data.content.toUpperCase(),
              message_type: 'server',
              session: data.sessionId,
              publishedAt: new Date()
            }
          });

          socket.emit('messageResponse', {
            userMessage,
            serverMessage
          });
        } catch (error) {
          socket.emit('error', { message: 'Failed to process message', error: error.message });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    strapi.io = io;
  },

  bootstrap({ strapi }: { strapi: any }) {}
};