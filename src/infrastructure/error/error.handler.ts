import { FastifyError,FastifyRequest, FastifyReply } from 'fastify'

export default async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  
  if(error.message) {
    return reply.status(400).send({ data: null, errors: [error.message] })
  }
  
  request.log.error(`An internal server error occured ${error}`)
  return reply.status(500).send({data: null, errors: ['Unknown error']})
}