export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'chatApplication'),
        jwt: {
          expiresIn: '7d',
        },
      },
    },
  });
