import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('soldiers');
const dutiesCollection = database.collection('duties');

const addSoldiers = async () => {
  const emptySoldiers = await soldiersCollection.drop();
  if (emptySoldiers) {
    soldiersCollection.insertMany([{
      _id: 'id1',
      name: 'name',
      degree: 'degree',
      limitations: ['l1', 'l2'],
      duties: ['62e29583af47a9b7a8e839d1', '62e62b7f21409be8ad77db02'],
    }, {
      _id: 'id2',
      name: 'name',
      degree: 'degree',
      limitations: ['l1', 'l2'],
      duties: ['62e29583af47a9b7a8e839d3'],
    }, {
      _id: 'id3',
      name: 'name',
      degree: 'degree',
      limitations: ['l1', 'l2'],
      duties: ['62e62b7f21409be8ad77db04'],
    }]);
  }
};

const addDuties = async () => {
  const emptyDuties = await dutiesCollection.drop();
  if (emptyDuties) {
    await dutiesCollection.insertMany([{
      _id: new ObjectId('62e29583af47a9b7a8e839d1'),
      name: 'name1',
      location: 'location',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 1,
      soldiers: ['id1'],
    }, {
      _id: new ObjectId('62e62b7f21409be8ad77db02'),
      name: 'name2',
      location: 'location2',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 20,
      soldiers: ['id1'],
    }, {
      _id: new ObjectId('62e29583af47a9b7a8e839d3'),
      name: 'name3',
      location: 'location',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 3,
      soldiers: ['id2'],
    }, {
      _id: new ObjectId('62e62b7f21409be8ad77db04'),
      name: 'name4',
      location: 'location2',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 4,
      soldiers: ['id3'],
    }]);
  }
};

const beforeJusticeBoardTest = async () => {
  await addSoldiers();
  await addDuties();
};

export default beforeJusticeBoardTest;

// beforeJusticeBoardTest();
