import { LoggerOptions } from 'pino'


const loggerOpts: LoggerOptions = {
  
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname,reqId'
    },
  }
}

export default loggerOpts