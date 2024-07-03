import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import helloRoutes from '@/routes/helloRoutes.js';

const registerRouter: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  // register routes
  fastify.register(helloRoutes, { prefix: '/hello' });
};

export default registerRouter;
