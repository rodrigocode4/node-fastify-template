import { App } from './features/base/base.types'

export default async (app: App) => {
  app.register(require('./features/user/user.routes'), { prefix: '/api/v1/user' })
}
