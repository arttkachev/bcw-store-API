// service provides functionality to "talk" to a database through repository and a model itself

import mongoose from 'mongoose'

const Schema = mongoose.Schema // Schema creates a model itself and defines how the object looks like in the db

// create an instance of the model
// holds the model
const _model = new Schema({
    // define our model
    name: { type: String, required: true},  // required means a name is mandatory, so, it's true
    
})

// expose the repository. We use the repository to contact with db
// we have an access to a db through the repository
export default class TagService 
{
    // getter
    // getter => access properties
    // setter => mutate properties
    // repository() is just an ordinary function we define inside ApparelService with a getter (get)
    get repository() {
        return mongoose.model("tag", _model) // this makes available all methods from mongo db (CRUD operations) // args (name of the model (you can specify anything), model definition)
    }
}