import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blogify API',
            version: '1.0.0',
            description: 'API documentation for the Blogify project',
        },
        servers: [
            {
                url: 'http://localhost:3000',  // Replace with your server URL
            },
        ],
    },
    apis: ['./routes/*.js'],  // This points to the routes to document
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

