import Fastify from 'fastify'
import swaggerOpts from './src/infrastructure/swagger.opts'
import logger from './src/infrastructure/logger.opts'
import errorHandler from './src/infrastructure/error.handler'
import fastifyHook from './src/infrastructure/logger.hook'

const opts = process.env.NODE_ENV !== 'test' ? ({
  logger,
  disableRequestLogging: true,
}) : undefined

const app = Fastify(opts)

export default app
  .addHook('onResponse', fastifyHook)
  .setErrorHandler(errorHandler)
  .register(require('@fastify/response-validation'))
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/swagger'), swaggerOpts)
  .register(require('@dnlup/fastify-traps'))
  .register(require('./src/infrastructure/dotenv'))
  .register(require('./src/routes'))