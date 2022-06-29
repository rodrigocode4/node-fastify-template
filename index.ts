import server from './app'

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    server.listen({ port: PORT as number, host: '0.0.0.0' })
    const host = `localhost:${PORT}`

    server.log.info(`Docs listening at http://${host}/docs`)
    server.log.info('Server has started!  🚀')

  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}
start()