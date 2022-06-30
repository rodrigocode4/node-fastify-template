import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

const swaggerOpts: FastifyDynamicSwaggerOptions = {
  routePrefix: 'docs',
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0',
      license: {
        name: 'MIT'
      }
    },
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        }
      },
    },
  },
  hideUntagged: true,
  exposeRoute: true
}

export default swaggerOpts