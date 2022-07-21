import fastify from 'fastify';
import 'dotenv/config';

import health from './routes/health.js';
import soldiers from './routes/soldiers.js';
import duties from './routes/duties.js';

const app = fastify({
  logger: true,
});

app.register(health);

app.register(soldiers);

app.register(duties);

export default app;
