import app from './app'
import database from './infrastructure/database/database.conn'

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await app.listen({ port: PORT as number, host: '0.0.0.0' })

    await database.on('start', (builder) => {
      app.log.debug(`SQL: ${builder.toQuery()}`)
    })
    console.log(app.printRoutes())
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
