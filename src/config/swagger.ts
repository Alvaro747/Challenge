import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Define configuration options for Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sneakers Store API',
      version: '1.0.0',
      description: 'API for the sneaker store',
    },
  },
  apis: ['**/*.ts'], // Specify the paths to your files with Swagger annotations
};

// Export a function to set up Swagger in the Express application
export function setupSwagger(app: Application) {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  // Add Swagger documentation to /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
