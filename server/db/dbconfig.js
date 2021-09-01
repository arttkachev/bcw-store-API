import mongoose from "mongoose" // connector to MongoDB

// set options for mongoose connection (see documentation for these options)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connection.on('error', err => {
    console.error('[DATABASE ERROR]:', err)
})

// grab a library to read public variables from a .env file
require('dotenv/config');

// use your own connection string here to check API
const connectionString = process.env.CONNECTION_STRING;

export default class DbContext {
    // we use promise (connect to db asynchronously)
    static async connect() {
    try {        
            let status = await mongoose.connect(connectionString) // try to connect to db with a mongoose method called connect(). We use mongoose for db connection
            // once connection is done, log this info            
            console.log("CONNECTED TO DB")
            return status
        } catch (error) {
            console.log(error)
        }
    }    
}