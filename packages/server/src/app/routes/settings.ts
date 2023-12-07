import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AppOptions } from '../app';

export default async function (fastify: FastifyInstance, options: AppOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // try {
    //   const data = Services.Settings.getSettings();
    //   reply.code(200).send(data);
    // } catch (err) {
    //   reply.code(401).send(err);
    // }
    reply.code(200);
  });

  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // try {
    //   const data = Services.Settings.getSettings();
    //   reply.code(200).send(data);
    // } catch (err) {
    //   reply.code(401).send(err);
    // }
    reply.code(200);
  });
}
