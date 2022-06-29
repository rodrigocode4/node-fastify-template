import errorSchema from "../../infrastructure/error.schema"
import { Opts } from "../base/base.types"

export const userPostOpts: Opts = {
  schema: {
    description: 'post some data',
    tags: ['code'],
    summary: 'qwerty',
    security: [{ apiKey: [] }],
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' }
          },
          required: ['some']
        }
      },
      required: ['hello', 'obj']
    },
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              hello: { type: 'string' }
            }
          }
        }
      },
      ...errorSchema(),
    }
  }
}

export const userGetOpts: Opts = {
  schema: {
    tags: ['user'],
    summary: 'qwerty',
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          },
        }
      },  
    }
  },
}
