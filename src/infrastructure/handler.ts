import { Error, Req, Reply } from '~/modules/base/base.types'


const errorHandler = async (error: Error, request: Req, reply: Reply) => {
  if(error.validation) {
    return reply.status(400).send({ data: null, errors: [error.message] })
  }

  request.log.error(`An internal server error occured ${error}`)
  
  return reply.status(500).send({data: null, errors: [error.message || 'Unknown error']})
}


const notFoundHandler = async (req: Req, reply: Reply) => {
  return reply.status(404).send({
    data: null,
    errors: [
      `Route ${req.method}:${req.url} not found`
    ],
  })
}


export default {
  notFoundHandler,
  errorHandler,
}
