let dotenv: any = null
if (process.env.NODE_ENV !== 'production') {
  dotenv = require('dotenv')
}
import { App } from '../modules/base/base.types'

export default async (app: App,) => {
  if (process.env.NODE_ENV !== 'production') {
    const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
    app.log.info(`Loading ${path} file from directory`)
    const result = await dotenv.config({ path })
    if (result.error) {
      app.log.error(`Error loading ${path} file from directory`, result.error)
      throw result.error
    }
  }
}
