import errorSchema from "../../infrastructure/error/error.schema"
import { Opts } from "../base/base.types"

export const userGetOpts: Opts = {
  schema: {
    tags: ['user'],
    summary: 'qwerty',
    querystring: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          pattern: '^((?!d)[a-zA-Z\s]+)*$'
        }

      }
    },
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    age: { type: 'number' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' }
                  }
                }
              }
            }
          },
          errors: {
            type: 'null',
            default: null
          }
        }
      },
      206: {
        description: 'Not content response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                default: []
              }
            }
          },
          errors: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      },
      ...errorSchema([404, 500]),
    }
  },
}
