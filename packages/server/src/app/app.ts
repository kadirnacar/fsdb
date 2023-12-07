import { FastifyInstance } from 'fastify';
// import AutoLoad from '@fastify/autoload';
import plugins from './plugins';
import routes from './routes';

export interface AppOptions {
  prefixPath: string;
}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(plugins, { ...opts });
  fastify.register(routes, { ...opts, prefixPath: 'api' });
}
