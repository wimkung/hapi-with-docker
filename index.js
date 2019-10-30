'use strict';

const Hapi = require('@hapi/hapi');
const sleep = require('await-sleep');

const init = async () => {

  const server = Hapi.server({
    port: 8000,
    host: '0.0.0.0'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return 'Hello World!';
    }
  });

  server.route({
    method: 'GET',
    path: '/{key}',
    handler: (request, h) => {

      return `Hello ${request.params.key.toUpperCase()}!`;
    }
  });

  server.route({
    method: 'POST',
    path: '/sleep/{duration}',
    handler: async (request, h) => {
      const { duration } = request.params;

      await sleep(duration);

      return `Sleep! ${duration} ms`;
    }
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();