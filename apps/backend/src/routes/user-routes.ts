import {
  TFetchUserPathParams,
  TRegisterUserBodyParams,
} from '@/lib/schemas/gameshift-api.js';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const userRoutes: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  fastify.get(
    '/:referenceId',
    { schema: { params: TFetchUserPathParams } },
    async function (req, reply) {
      const { referenceId } = req.params;

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-api-key': this.env.GAMESHIFT_API_KEY,
        },
      };
      const res = await fetch(
        `https://api.gameshift.dev/nx/users/${referenceId}`,
        options,
      );

      return res;
    },
  );

  fastify.post(
    '/register',
    { schema: { body: TRegisterUserBodyParams } },
    async function (req, reply) {
      const { referenceId, email, externalWalletAddress } = req.body;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': this.env.GAMESHIFT_API_KEY,
        },
        body: JSON.stringify({ referenceId, email, externalWalletAddress }),
      } as RequestInit;

      const res = await fetch('https://api.gameshift.dev/nx/users', options);
      return res;
    },
  );

  fastify.get('/', async function (req, reply) {
    return { hello: 'true' };
  });
};

export default userRoutes;
