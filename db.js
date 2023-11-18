const {MongoClient} = require('mongodb')

let dbConnection;

module.exports = {
    connectToDb: (cb) =>{
        MongoClient.connect('mongodb+srv://anshg0432:f8DRWunmH1Xje6Nc@cluster0.mrhin2q.mongodb.net/mongo_app?retryWrites=true&w=majority')
            .then((client)=>{
                dbConnection = client.db()
                return cb()
            }).catch((err)=>{
                console.log(err)
                return cb(err)
            })
    },
    
    getDb: () => dbConnection
}

// const { MongoClient } = require('mongodb');

// let dbConnection;

// module.exports = {
//   connectToDb: (cb) => {
    
//     // Replace the connection URL with your MongoDB server's URL
//     const uri = 'mongodb://127.0.0:27017/bookstore';
    
//     const client = new MongoClient(uri);

//     client.connect()
//       .then(() => {
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//         return cb(err);
//       });
//   },
//   getDb: () => dbConnection,
// };
