const options = {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Download Planet',
        description: 'description',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'description'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
}

export default options;
