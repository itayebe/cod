import fastify from 'fastify';
import 'dotenv/config';

const app = fastify({
  logger: true,
});

app.get('/health', (request, reply) => {
  reply.status(200).send();
});

export default app;
