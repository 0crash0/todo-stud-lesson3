const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    swaggerDefinition: {
        restapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Изначально пример был взят отсюда https://abbaslanbay.medium.com/node-js-rest-api-using-express-and-swagger-39744533dba4' +
                ' \n но затем был изменен механизм присвоения id т.к. его нужно было постоянно закидывать с параметрами при содзнии и обновлении задачи',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./todo.js'],
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}