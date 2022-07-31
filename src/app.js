import fastify from 'fastify';
import 'dotenv/config';

import health from './routes/health.js';
import soldiers from './routes/soldiers.js';

const app = fastify({
  logger: true,
});

app.register(health);

app.register(soldiers);

export default app;
