// service provides functionality to "talk" to a database through repository and a model itself

import mongoose from 'mongoose'

const Schema = mongoose.Schema // Schema creates a model itself and defines how the object looks like in the db
const ObjectId = Schema.Types.ObjectId // ObjectId references to the object in db. We can have an access to the object in db by this way

// create an instance of the model
// holds the model
const _model = new Schema({
    // define our model
    name: { type: String, required: true},  // required means a name is mandatory, so, it's true
    description: { type: String },
    price: { type: Number, required: true},
    stock: { type: Number, default: 0}, // default means default price
    manufacturer: { type: ObjectId, ref: "manufacturer", required: true, default: null}, // See ObjecctId description. This is a reference to the object in db. Value will be passed in is an object id. Args (object id, where this object id is refering to)
    // it knows that we refer to manufacturer because in ManufacturerService.js we get a repository (model) with the same name "manufacturer"
    // so, we refer to another object in db by this way. required and default have the same meaning. See prompts above
    tags: [ { type: ObjectId, ref: "tag"} ] // ref: must correspond to what you get in a corresponding service in a get repository method return mongoose.model("tag", _model). First argument

})

// expose the repository. We use the repository to contact with db
// we have an access to a db through the repository
export default class ApparelService 
{
    // getter
    // getter => access properties
    // setter => mutate properties
    // repository() is just an ordinary function we define inside ApparelService with a getter (get)
    get repository() {
        return mongoose.model("apparel", _model) // this makes available all methods from mongo db (CRUD operations) // args (name of the model, model definition)
    }
}