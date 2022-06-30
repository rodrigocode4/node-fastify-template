import Fastify from 'fastify'
import swaggerOpts from './src/infrastructure/swagger/swagger.opts'
import errorHandler from './src/infrastructure/error/error.handler'
import fastifyHook from './src/infrastructure/logger/logger.hook'
import loggerOpts from './src/infrastructure/logger/logger.opts'

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test' ? loggerOpts : false,
  disableRequestLogging: true,
})

export default app
  .addHook('onResponse', fastifyHook)
  .setErrorHandler(errorHandler)
  .register(require('@fastify/response-validation'))
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/swagger'), swaggerOpts)
  .register(require('./src/infrastructure/dotenv'))
  .register(require('./src/routes'))