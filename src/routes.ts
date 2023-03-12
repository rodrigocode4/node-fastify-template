import { App } from './modules/base/base.types'

export default async (app: App) => {
  app.register(require('./modules/user/user.routes'), { prefix: '/api/v1/user' })
}
