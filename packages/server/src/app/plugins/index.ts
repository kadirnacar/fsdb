import mongoPlugin from '@fastify/mongodb';
import sensible from '@fastify/sensible';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  // fastify.register(mongoPlugin, {
  //   // force to close the mongodb connection when app stopped
  //   // the default value is false
  //   forceClose: true,

  //   // url: 'mongodb://mongo/mydb'
  // });
  fastify.register(sensible);
});
