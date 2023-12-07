import { FastifyInstance } from 'fastify';
import { AppOptions } from '../app';
import settings from './settings';

export default async function (fastify: FastifyInstance, options: AppOptions) {
  fastify.register(settings, { ...options });
}
