import fastify from 'fastify';
import 'dotenv/config';
import fastifySwagger from '@fastify/swagger'

import health from './routes/health.js';
import soldiers from './routes/soldiers.js';
import duties from './routes/duties.js';
import justiceBoard from './routes/justiceBoard.js';

import swaggerOptions from './swagger.js';

const app = fastify({
  logger: true,
});

app.register(fastifySwagger, swaggerOptions);

app.register(health);

app.register(soldiers);

app.register(duties);

app.register(justiceBoard);

export default app;
