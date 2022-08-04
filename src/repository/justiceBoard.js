import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('soldiers');
const dutiesCollection = database.collection('duties');

export const makeJusticeBoard = async (request, reply) => {
  const soldiersArray = await soldiersCollection.find().toArray();
  const justiceBoardArray = [];
  let score, duty;
  for (const soldier of soldiersArray) {
    score = 0;
    for (const dutyId of soldier.duties) {
      try {
        duty = await dutiesCollection.findOne({ _id: new ObjectId(dutyId) });
        score += duty.value;
      } catch (error) {
        reply.send(error);
      }
    }
    justiceBoardArray.push({ id: soldier._id, score });
  }
  reply.status(200).send(justiceBoardArray);
}
