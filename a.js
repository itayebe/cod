import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('aw');

const start = async () => {
    const soldiers = [{
        _id: '1231adasdasdaasdaaasda23drgsrdssfdfdfdfsaljdf123',
        name: 'dfa',
    }, {
        _id: '123123aasdasdsdsdafsdfsdfdfsdf156ergdfg23',
        name: 'sd',
    }, {
        _id: '1asdasdasdaasdsd23',
        name: 'df',
    }, {
        _id: '890rughasasdrwhasdasdasdaasdasdsadjhasbdhsbdkasjdn8',
        name: 'sd',
    }];

    try {
        await soldiersCollection.insertMany(soldiers, { ordered: false });
        console.log('all captures inserted successfully');
    } catch (err) {
        err.writeErrors.forEach((writeError) => {
            console.log(writeError.errmsg);
        });
        console.log(`${err.result.nInserted}/${Object.keys(err.result.insertedIds).length} inserted successfully`)
    }
}

start();