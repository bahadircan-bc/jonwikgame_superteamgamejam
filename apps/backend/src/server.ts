import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import appEnv from '@/lib/plugins/env.js';
import fastifySensible from '@fastify/sensible';
import fastifyGracefulShutdown from '@ardasevinc/fastify-graceful-shutdown';
import appRouter from '@/lib/plugins/router.js';
import { type Env } from '@/lib/schemas/env.js';

// TODO: Create a configuration loader function page: 26 in fastify book
const envToLogger: Record<Env['NODE_ENV'], any> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    level: 'debug',
  },
  production: true,
  test: false,
};

const nodeEnv = process.env.NODE_ENV as Env['NODE_ENV'];

const fastify = Fastify({
  logger: envToLogger[nodeEnv] ?? true,
}).withTypeProvider<TypeBoxTypeProvider>();

/* TODO: Improve server startup and shutdown.
 * On Startup: Resume last running simulation.
 * On Shutdown: Stop running simulations gracefully.
 * we need a way to know when simulations are paused by server shutdown
 * add a reason field somewhere, so we know why a simulation is stopped.
 */
const bootApp = async () => {
  // The following structure should be followed inside every registration level
  /* Recommended booting order:
   * external plugins
   * our plugins
   * decorators
   * hooks
   * services - routes etc
   */
  try {
    await fastify.register(appEnv);
    fastify.log.debug(`MODE: ${fastify.env.NODE_ENV}`);
    fastify.register(fastifySensible);

    fastify.register(fastifyGracefulShutdown).after(() => {
      fastify.gracefulShutdown((signal, next) => {
        fastify.log.info('Received signal to shutdown: %s', signal);
        next();
      });
    });

    fastify.register(appRouter, { prefix: '/api' });

    fastify.log.debug(`PID: ${process.pid}`);
    await fastify.listen({ host: '0.0.0.0', port: fastify.env.PORT });
    fastify.log.debug(`PLUGINS:\n${fastify.printPlugins()}`);
    fastify.log.debug(
      `ROUTES:\n${fastify.printRoutes({ commonPrefix: false })}`,
    );
  } catch (error) {
    fastify.log.error({ msg: 'Error during server startup', error });
    process.exit(1);
  }
};
bootApp();
