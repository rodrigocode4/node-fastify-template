import { StatusCodes } from 'http-status-codes'
import messages from "../../infrastructure/messages"
import { App } from "../base/base.types"
import { userGetOpts } from './user.opts'
import service from './user.service'

export default async (app: App) => {

  app.get('/', userGetOpts, async (req, reply) => {
    const { name } = <{name: string}>req.query
    const { data: users } = await service.get(name)

    let errors: string[] | undefined
    let status = StatusCodes.OK
    const errorMessage = messages.listHasNoDataFound(users)

    if(errorMessage) {
      status = StatusCodes.PARTIAL_CONTENT
      errors = [ errorMessage ]
    }
    
    return reply.status(status).send({ data: { users }, errors})
  })

}



