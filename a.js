import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://itayebens:itay5632@cluster0.8d5jyzq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const database = client.db('cod-db');
const soldiersCollection = database.collection('ss');

const start = async () => {
    const soldiers = [{
        _id: '11111',
        name: 'dfa',
    }, {
        _id: '22222',
        name: 'sd',
    }, {
        _id: '33333',
        name: 'df',
    }, {
        _id: '44444',
        name: 'sd',
    }];

    try {
        const result = await soldiersCollection.insertMany(soldiers, { ordered: false });
        console.log('All items inserted successfully');
        console.log(result);
      } catch (err) {
        if (err.code === 11000) {
            console.log('WriteErrorsMessages:', err.writeErrors.map((writeError) => writeError.errmsg));
            console.log(`${err.result.nInserted}/${Object.keys(err.result.insertedIds).length} items inserted successfully`);
            console.log(`code: ${err.code}`);
            console.log(`msg: ${err.message}`);
            console.log(`result: ${err.result}`);
            console.log(`stack: ${err.writeConcernError}`);
        } else {
            console.log(`asd: ${err}`);
        }  
    }
}
    // try {
    //     await soldiersCollection.insertMany(soldiers, { ordered: false });
    //     console.log('all captures inserted successfully');
    // } catch (err) {
    //     console.log('---------------');
    //     console.log(err.writeErrors.map(wE => wE.errmsg), 'writeErrorMessages');
    //     console.log('---------------');
    //     err.writeErrors.forEach((writeError) => {
    //         console.log(writeError.errmsg);
    //     });
    //     // console.log(`${err.result.nInserted}/${Object.keys(err.result.insertedIds).length} inserted successfully`)
    // }

// try {
//     const ids = await soldiersCollection.find({ name: 'sd' }).project({ }).toArray();
//     console.log(ids);
// } catch (err) {
//     console.log('error');
// }

// try {
//     const ids = ['111', '222', '333', '444']
//     await soldiersCollection.updateMany({ _id: { $in: ids } }, { $set: {status:'sss'} });
//     console.log('all captures inserted successfully');
// } catch (err) {
//     err.writeErrors.forEach((writeError) => {
//         console.log(writeError.errmsg);
//     });
//     console.log(`${err.result.nInserted}/${Object.keys(err.result.insertedIds).length} inserted successfully`)
// }
start();