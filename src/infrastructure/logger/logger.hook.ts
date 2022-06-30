import { FastifyRequest, FastifyReply } from 'fastify'

const getLogLevel = (status: number) => {
  if (status < 400) return 'info'
  if (status < 500) return 'warn'
  return 'error'
}

export default async (request: FastifyRequest, reply: FastifyReply) => {
  const message = `${request.method} ${reply.statusCode} ${request.url} ${reply.getResponseTime().toPrecision(2)}ms`
  request.log[getLogLevel(reply.statusCode)](message)
}