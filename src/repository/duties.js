import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const dutiesCollection = database.collection('duties');
const soldiersCollection = database.collection('soldiers');

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
  const newDuty = { ...duty, _id: id };
  const result = await dutiesCollection.updateOne(query, { $set: duty });
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

const chooseSoldiers = async (duty) => {
  const soldiersArray = await soldiersCollection.find().toArray();
  let soldiersWithScore = [];
  let score, soldiersDuty;
  for (const soldier of soldiersArray) {
    if (!duty.constraints.includes(soldier._id) && !soldier.limitations.includes(duty._id)) {
      score = 0;
      let promises = [];
      for (const dutyId of soldier.duties) {
        try {
          promises.push(dutiesCollection.findOne({ _id: new ObjectId(dutyId) }));
        } catch { }
        Promise.all(promises).then((duty) => {
          score += duty.value;
        });
      }
      soldiersWithScore.push({ soldier, score });
    }
  }
  soldiersWithScore.sort((a, b) => { return a.score - b.score; });
  soldiersWithScore = soldiersWithScore.slice(0, duty.soldiersRequired);
  const soldiers = [];
  for (const soldierWithScore of soldiersWithScore) {
    soldiers.push(soldierWithScore.soldier._id);
  }
  return soldiers;
}

export const scheduleDuty = async (request, reply) => {
  const { id } = request.params;
  const query = { _id: new ObjectId(id) };
  const duty = await dutiesCollection.findOne(query);
  if (duty) {
    if (duty.soldiers.length >= 1) {
      reply.status(404).send(`The duty ${id} is already scheduled`);
    } else {
      const soldiers = await chooseSoldiers(duty);
      reply.send(soldiers);
      // for (const soldierId of soldiers) {
      //   try {
      //     await dutiesCollection.updateOne(query, { $push: { soldiers: soldierId }});
      //     try {
      //       await soldiersCollection.updateOne({ _id: soldierId }, { $push: { duties: id }});
      //     } catch {
      //       reply.status(404).send(`Cannot schedule the duty ${id}`)
      //     }
      //   } catch {
      //     reply.status(404).send(`Cannot schedule the duty ${id}`)
      //   }
      // }
      // reply.status(200).send(`The duty ${id} successfully scheduled to soldiers: ${soldiers}`);
    }
  }
}
