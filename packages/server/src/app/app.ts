import * as path from 'path';
import { FastifyInstance } from 'fastify';
// import AutoLoad from '@fastify/autoload';
import sensible from './plugins/sensible';
import routes from './routes/root';

export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(sensible, { ...opts });
  fastify.register(routes, { ...opts });
  // // Place here your custom code!

  // // Do not touch the following lines

  // // This loads all plugins defined in plugins
  // // those should be support plugins that are reused
  // // through your application
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'plugins'),
  //   options: { ...opts },
  // });

  // // This loads all plugins defined in routes
  // // define your routes in one of these
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'routes'),
  //   options: { ...opts },
  // });
}
