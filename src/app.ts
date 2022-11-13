import Fastify from 'fastify'
import swagger from './infrastructure/swagger/swagger.opts'
import handler from './infrastructure/handler'
import errorHook from './infrastructure/error/error.hook'
import loggerOpts from './infrastructure/logger/logger.opts'
import responseValidation from './infrastructure/response-validation.opts'

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test' ? loggerOpts : false,
  disableRequestLogging: true,
})

export default app
  .addHook('onResponse', errorHook)
  .setErrorHandler(handler.errorHandler)
  .setNotFoundHandler(handler.notFoundHandler)
  .register(require('@fastify/response-validation'), responseValidation.ajvConfigOpts)
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/swagger'), swagger.swaggerOpts)
  .register(require('@fastify/swagger-ui'), swagger.swaggerUiOpts)
  .register(require('./infrastructure/dotenv'))
  .register(require('./routes'))
