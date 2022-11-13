import app from './app'
import db from '~/infrastructure/database/prisma.client'

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await app.listen({ port: PORT as number, host: '0.0.0.0' })

    if (process.env.NODE_ENV === 'dev') {
      await db.$on('query', ({ query, params, duration }) => {
        app.log.debug(`Query: ${query}`)
        app.log.debug(`Params: ${params}`)
        app.log.debug(`Duration: ${duration}ms`)
      })
    }

    app.log.info(`Docs listening at http://localhost:${PORT}/docs`)
    app.log.info('Server has started! 🚀')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    app.log.error(err)
    process.exit(1)
  }
}

export default { start }
