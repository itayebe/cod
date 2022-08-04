import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('soldiers');

const beforeSoldiersTest = async () => {
  const emptySoldiers = await soldiersCollection.drop();
  if (emptySoldiers) {
    const soldier = {
      _id: 'duplicateId',
      name: 'name',
      degree: 'degree',
      limitations: ['l1', 'l2'],
      duties: [],
    };
    await soldiersCollection.insertOne(soldier);
  }
};

export default beforeSoldiersTest;
