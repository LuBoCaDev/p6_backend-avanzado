import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'NodeApp API',
      version: '0.1',
      description: 'API de NodeApp'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          descripcion: 'JWT Authorization header. Example: "Authorization: {token}"'
        },
      },
    },
    security: [
      { BearerAuth: [] }
    ],
  },
  apis: ['swagger.yaml']
  // apis: ['controllers/api/**/*.js']
}

const specification = swaggerJSDoc(options)

export default [swaggerUI.serve, swaggerUI.setup(specification)]