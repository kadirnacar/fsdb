import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance, options) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });
}
