import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { fastifyTelegraf } from '@ardasevinc/fastify-telegraf';
import { type Context } from 'telegraf';

const telegram: FastifyPluginAsyncTypebox = async function (fastify, _opts) {
  await fastify.register(fastifyTelegraf, {
    botToken: fastify.env.BOT_TOKEN,
    decoratorBotName: 'bot',
    waitForHealthPolling: 2000,
    onUnhandledError: async (err, ctx: Context) => {
      fastify.log.error(
        err,
        `Ooops, encountered an error for "${ctx.updateType}"`,
      );
      await ctx.reply('🙈 Ooops, something went wrong');
    },
  });
};

export default telegram;
