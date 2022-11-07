import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('planet-download-db');
const dutiesCollection = database.collection('planet');


const newDuty = { _id: 'asd' }
try {
const result = await dutiesCollection.insertOne(newDuty);
if (result) {
    console.log('asd');
}
} catch (err) {
    console.log(err.code);
}
