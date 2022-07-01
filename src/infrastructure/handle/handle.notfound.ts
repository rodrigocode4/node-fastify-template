import { Req, Reply } from '~/modules/base/base.types'


export default async (req: Req, reply: Reply) => {
  return reply.status(404).send({
    data: null,
    errors: [
      `Route ${req.method}:${req.url} not found`
    ]
  })
}