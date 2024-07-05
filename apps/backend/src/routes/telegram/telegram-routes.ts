import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { message } from 'telegraf/filters';

const telegramRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  _opts,
) {
  fastify.bot.start(async function (ctx) {
    await ctx.reply('start cmd');
  });
  fastify.bot.help(async function (ctx) {
    await ctx.reply('you dont need my help');
  });
  fastify.bot.hears(['hello', 'wik', 'jon', 'jon wik'], async function (ctx) {
    await ctx.reply('BUY $WIK NOW');
  });
  // fastify.bot.on(message('text'), async function (ctx) {
  //   await ctx.reply('BUY $WIK NOW');
  // });
};

export default telegramRoutes;
