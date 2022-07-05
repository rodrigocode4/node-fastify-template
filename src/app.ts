import Fastify from 'fastify'
import swaggerOpts from './infrastructure/swagger/swagger.opts'
import handler from './infrastructure/handler'
import errorHook from './infrastructure/error/error.hook'
import loggerOpts from './infrastructure/logger/logger.opts'

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test' ? loggerOpts : false,
  disableRequestLogging: true,
})

export default app
  .addHook('onResponse', errorHook)
  .setErrorHandler(handler.errorHandler)
  .setNotFoundHandler(handler.notFoundHandler)
  .register(require('@fastify/response-validation'))
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/swagger'), swaggerOpts)
  .register(require('./infrastructure/dotenv'))
  .register(require('./routes'))
