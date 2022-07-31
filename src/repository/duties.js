import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const dutiesCollection = database.collection('duties');

export const createDuty = async (request, reply) => {
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
  const result = await dutiesCollection.insertOne(newDuty);
  if (result) {
    reply.status(201).send(newDuty);
  }
}

export const findDuties = async (request, reply) => {
  const result = await dutiesCollection.find(request.query).toArray();
  if (result.length >= 1) {
    reply.status(200).send(result);
  } else {
    reply.status(404).send();
  }
}

export const findDutyById = async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id) };
  const result = await dutiesCollection.findOne(query);
  if (result) {
    reply.status(200).send(result);
  } else {
    reply.status(404).send();
  }
}

export const deleteDuty = async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id), soldiers: [] };
  const result = await dutiesCollection.deleteOne(query);
  if (result.deletedCount === 1) {
    reply.status(200).send();
  } else {
    reply.status(404).send();
  }
}

export const updateDuty = async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id), soldiers: [] };
  const duty = request.body;
  const newDuty = {};
  if (duty.name) { newDuty.name = duty.name; }
  if (duty.location) { newDuty.location = duty.location; }
  if (duty.time) { newDuty.time = duty.time; }
  if (duty.constraints) { newDuty.constraints = duty.constraints; }
  if (duty.soldiersRequired) { newDuty.soldiersRequired = duty.soldiersRequired; }
  if (duty.value) { newDuty.value = duty.value; }
  const result = await dutiesCollection.updateOne(query, { $set: newDuty });
  newDuty._id = id;
  if (result) {
    const updatedDuty = await dutiesCollection.findOne(query);
    if (updatedDuty) {
      reply.status(200).send(updatedDuty);
    }
  } else {
    reply.status(404).send();
  }
}
