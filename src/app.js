import fastify from 'fastify';
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import soldierSchema from '../schema/soldier-schema.js';
import dutySchema from '../schema/duty-schema.js';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiers = database.collection('soldiers');
const duties = database.collection('duties');

const app = fastify({
  logger: true,
});

app.get('/health', (request, reply) => {
  reply.status(200).send();
});

app.post('/soldiers', { schema: soldierSchema }, async (request, reply) => {
  const soldier = request.body;
  const newSoldier = {
    _id: soldier.id,
    name: soldier.name,
    degree: soldier.degree,
    limitations: soldier.limitations,
    duties: [],
  };
  const result = await soldiers.insertOne(newSoldier);
  if (result) {
    reply.status(201).send(newSoldier);
  }
});

app.get('/soldiers', async (request, reply) => {
  const result = await soldiers.find(request.query).toArray();
  reply.status(200).send(result);
});

app.get('/soldiers/:id', async (request, reply) => {
  const { id } = request.params;
  const query = { _id: id };
  const result = await soldiers.findOne(query);
  if (result) {
    reply.status(200).send(result);
  } else {
    reply.status(404).send();
  }
});

app.post('/duties', { schema: dutySchema }, async (request, reply) => {
  const duty = request.body;
  const newDuty = {
    name: duty.name,
    location: duty.location,
    time: duty.time,
    constraints: duty.constraints,
    soldiersRequired: duty.soldiersRequired,
    value: duty.value,
    soldiers: [],
  };
  const result = await duties.insertOne(newDuty);
  if (result) {
    reply.status(201).send(newDuty);
  }
});

app.get('/duties', async (request, reply) => {
  const result = await duties.find(request.query).toArray();
  reply.status(200).send(result);
});

app.get('/duties/:id', async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id) };
  const result = await duties.findOne(query);
  if (result) {
    reply.status(200).send(result);
  } else {
    reply.status(404).send();
  }
});

app.delete('/duties/:id', async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id), soldiers: [] };
  const result = await duties.deleteOne(query);
  if (result.deletedCount === 1) {
    reply.status(200).send();
  } else {
    reply.status(404).send();
  }
});

app.patch('/duties/:id', { schema: dutySchema }, async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id), soldiers: [] };
  const duty = request.body;
  const newDuty = {
    name: duty.name,
    location: duty.location,
    time: duty.time,
    constraints: duty.constraints,
    soldiersRequired: duty.soldiersRequired,
    value: duty.value,
    soldiers: [],
  };
  const result = await duties.updateOne(query, { $set: newDuty });
  newDuty._id = id;
  if (result) {
    reply.status(200).send(newDuty);
  } else {
    reply.status(404).send();
  }
});

export default app;
