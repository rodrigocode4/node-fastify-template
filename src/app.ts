import Fastify from 'fastify'
import swaggerOpts from './infrastructure/swagger/swagger.opts'
import errorHandler from './infrastructure/handle/handle.error'
import errorHook from './infrastructure/error/error.hook'
import loggerOpts from './infrastructure/logger/logger.opts'
import notfoundHandler from './infrastructure/handle/handle.notfound'

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test' ? loggerOpts : false,
  disableRequestLogging: true,
})

export default app
  .addHook('onResponse', errorHook)
  .setErrorHandler(errorHandler)
  .setNotFoundHandler(notfoundHandler)
  .register(require('@fastify/response-validation'))
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/swagger'), swaggerOpts)
  .register(require('./infrastructure/dotenv'))
  .register(require('./routes'))