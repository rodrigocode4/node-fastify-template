import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

const swaggerOpts: FastifyDynamicSwaggerOptions = {
  routePrefix: 'docs',
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
  exposeRoute: true,
}

export default swaggerOpts
