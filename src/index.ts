// src/index.ts (or .js if using JavaScript)
// import { Strapi } from '@strapi/strapi';
import { Server } from 'socket.io';

interface MessageData {
  content: string;
  room: string;
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

      // Handle room joining
      socket.on('joinRoom', async (roomId: string) => {
        socket.join(`room_${roomId}`);
        console.log(`User joined room ${roomId}`);
        
        // Send last 50 messages from the room
        const messages = await strapi.entityService.findMany('api::message.message', {
          filters: { room: roomId },
          sort: 'createdAt:desc',
          limit: 50,
          populate: ['author']
        });
        
        socket.emit('initialMessages', messages.reverse());
      });

      // Handle new messages
      socket.on('createMessage', async (data: MessageData) => {
        try {
          // const { user } = socket.request;
          
          // if (!user) {
          //   throw new Error('Not authenticated');
          // }

          const message = await strapi.entityService.create('api::message.message', {
            data: {
              content: data.content,
              room: data.room,
              // author: user.id
            },
            populate: ['author', 'room']
          });

          io.to(`room_${data.room}`).emit('newMessage', message);
        } catch (error) {
          socket.emit('error', {
            message: 'Failed to create message',
            error: error.message
          });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // Add socket.io instance to strapi context
    strapi.io = io;
  },

  bootstrap({ strapi }: { strapi: any }) {
    // Optional bootstrap logic
  }
};