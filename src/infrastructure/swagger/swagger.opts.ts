import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

const swaggerOpts: FastifyDynamicSwaggerOptions = {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Node Fatify API',
      description: 'Documentação da api com Fastify',
      version: '0.1.0',
      license: {
        name: 'MIT',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },

  },
  hideUntagged: true,
}

const swaggerUiOpts: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    deepLinking: false,
  },
}

export default { swaggerOpts, swaggerUiOpts }
