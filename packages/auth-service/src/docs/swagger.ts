import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Authentication Service API',
      version: '1.0.0',
      description:
        'Service in charge of handling user authentication and authorization',
    },
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
