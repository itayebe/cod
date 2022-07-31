import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('soldiers');

export const createSoldier = async (request, reply) => {
    const soldier = request.body;
    const newSoldier = {
      _id: soldier.id,
      name: soldier.name,
      degree: soldier.degree,
      limitations: soldier.limitations,
      duties: [],
    };
    const result = await soldiersCollection.insertOne(newSoldier);
    if (result) {
      reply.status(201).send(newSoldier);
    }
}

export const findSoldiers = async (request, reply) => {
    const result = await soldiersCollection.find(request.query).toArray();
    if (result.length >= 1) {
      reply.status(200).send(result);
    } else {
      reply.status(404).send();
    }
}

export const findSoldierById = async (request, reply) => {
    const { id } = request.params;
    const query = { _id: id };
    const result = await soldiersCollection.findOne(query);
    if (result) {
      reply.status(200).send(result);
    } else {
      reply.status(404).send();
    }
}
