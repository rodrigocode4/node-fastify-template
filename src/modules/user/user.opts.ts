import { StatusCodes } from 'http-status-codes'
import database from '~/infrastructure/database/database.conn'
import errorSchema from '~/infrastructure/error/error.schema'
import messages from '~/infrastructure/messages'
import { Opts } from '../base/base.types'
import { table } from './user.repository'
import { User } from './user.types'

export const userGetOpts: Opts = {
  schema: {
    tags: ['User'],
    summary: 'Get user by name or all users',
    security: [{ bearerAuth: [] }],
    querystring: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          pattern: '^((?!d)[a-zA-Z\\s]+)*$',
        },
      },
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
                    updatedAt: { type: 'string' },
                  },
                },
              },
            },
          },
          errors: {
            type: 'null',
            default: null,
          },
        },
      },
      206: {
        description: 'Partial content response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                default: [],
              },
            },
          },
          errors: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      ...errorSchema([404, 500]),
    },
  },
}

export const userPostOpts: Opts = {
  schema: {
    tags: ['User'],
    summary: 'Create new user',
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          pattern: '^((?!d)[a-zA-Z\\s]+)*$',
        },
        age: {
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['name', 'age'],
    },
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  age: { type: 'number' },
                },
              },
            },
          },
          errors: {
            type: 'null',
            default: null,
          },
        },
      },
      ...errorSchema(),
    },
  },
}

export const userPutOpts: Opts = {
  preHandler: async (req, reply) => {
    const { id } = <{id: number}>req.query
    const { hasId } = await database<User>(table)
      .count('id', { as: 'hasId' })
      .where({ id })
      .first<{hasId: number}>()
    if (!hasId) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ data: null, errors: [messages.notFindById(id)] })
    }
  },
  schema: {
    tags: ['User'],
    summary: 'Update user',
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          pattern: '^((?!d)[a-zA-Z\\s]+)*$',
        },
        age: {
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['name', 'age'],
    },
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  age: { type: 'number' },
                },
              },
            },
          },
          errors: {
            type: 'null',
            default: null,
          },
        },
      },
      ...errorSchema(),
    },
  },
}
