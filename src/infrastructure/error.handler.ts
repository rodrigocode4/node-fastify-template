import { FastifyError,FastifyRequest, FastifyReply } from 'fastify'

export default async (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  const message = error.code || error.message || 'Unknown error'
  request.log.error(`An internal server error occured ${error}`)

  if(error.validation) {
    const errors = error.validation.map(({message}) => message)
    return reply.status(400).send({ data: null, errors })
  }

  return reply.status(500).send({data: null, errors: [message]})
}