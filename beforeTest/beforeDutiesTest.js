import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const dutiesCollection = database.collection('duties');

const beforeDutiesTest = async () => {
  const emptyDuties = await dutiesCollection.drop();
  if (emptyDuties) {
    await dutiesCollection.insertMany([{
      _id: new ObjectId('62e29583af47a9b7a8e839d6'),
      name: 'name1',
      location: 'location',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 2,
      soldiers: [],
    }, {
      _id: new ObjectId('62e62b7f21409be8ad77db00'),
      name: 'name2',
      location: 'location2',
      time: {
        start: 'start',
        end: 'end',
      },
      constraints: ['c1', 'c2'],
      soldiersRequired: 1,
      value: 2,
      soldiers: [],
    }]);
  }
};

export default beforeDutiesTest;
