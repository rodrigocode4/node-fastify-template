import { StatusCodes } from 'http-status-codes'
import errorSchema from '~/infrastructure/error/error.schema'
import messages from '~/infrastructure/messages'
import { Opts } from '../base/base.types'
import userService from './user.service'

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
        description: 'Successful response',
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
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
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
      ...errorSchema(404),
    },
  },
}

export const userGetByIdOpts: Opts = {
  schema: {
    tags: ['User'],
    summary: 'Get user by Id',
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
    },
    response: {
      200: {
        description: 'Successful response',
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
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
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
      ...errorSchema(404),
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
        description: 'Successful response',
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
  preHandler: async (req, reply, done) => {
    const { id } = <{ id: number }>req.query
    const hasId = await userService.existById(id)
    if (!hasId) {
      return reply.status(StatusCodes.BAD_REQUEST).send({ data: null, errors: [messages.notFindById(id)] })
    }
    return done()
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
        description: 'Successful response',
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

export const userDeleteByIdOpts: Opts = {
  schema: {
    tags: ['User'],
    summary: 'Delete user by Id',
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
            },
          },
          errors: {
            type: 'null',
            default: null,
          },
        },
      },
      ...errorSchema(404),
    },
  },
}
