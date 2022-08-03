const health = async (app, options) => {
  app.get('/health', async (request, reply) => {
    reply.status(200).send();
  })
}

export default health;
