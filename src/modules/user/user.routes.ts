import { App } from "../base/base.types"
import { userGetOpts, userPostOpts} from './user.opts'


export default async (app: App) => {

  app.get('/user', userGetOpts, async (_req, reply) => {
    return reply.status(200).send({data: {
      name: "Rodrigo"
    }})
  })

  app.post('/aa', userPostOpts, async (_req, reply) =>{ 
    reply.code(200).send({ data: {hello: `Hello`} })
  })

}



