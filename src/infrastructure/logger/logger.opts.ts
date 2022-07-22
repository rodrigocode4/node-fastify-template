import { LoggerOptions } from 'pino'
import { PrettyOptions } from 'pino-pretty'

const loggerOpts: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname,reqId',
      colorize: true,
    } as PrettyOptions,
  },
  level: process.env.DEBUG ? 'debug' : 'info',
}

export default loggerOpts
