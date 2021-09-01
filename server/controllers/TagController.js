// controller handles requests/responds

import express from 'express'
import TagService from '../services/TagService';
import ApparelService from '../services/ApparelService';

// expose our model and functionality to talk to db through TagService
let _tagService = new TagService().repository
let _apparelService = new ApparelService().repository

// export default makes the class available outside of this file
// this controller route by default is under '/api/Tag' that corresponds to '' in a get method below. This is a root of the path 
export default class TagController 
{
    constructor() {
        this.router = express.Router() // this class needs a Router as a hallway for requests
            .get('', this.getAllTags) // attach a get method to our Router. Args (specific doorway (nothing in our case, so, it will open up '/api/Tag' = all Tags), function to call)
            .get('/:id/apparel', this.getApparelByTagId)       
            .post('', this.addTag) // args (add a new Tag to all Tags '/api/Tag', that corresponds '', function to call)
            .put('/:id', this.editTag) // args (Tag to edit by id (in our case), function to call)
            .delete('/:id', this.deleteTag) // args (Tag to delete by id (in our case), function to call)
    }

// promise to get Tags
    async getAllTags(req, res, next) {
        try 
        {
            // let Tag = await _tagService.find({}) // when passing empty curly brackets in a find method, it finds all items in the db. Or we could spcify a certain itme like this { name: "Hat" }
            let Tag = await _tagService.find({}) // populate method gives us not only id of the tag but its body. More human readable data
            return res.send(Tag) // return all Tags to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }  

    async getApparelByTagId(req, res, next) {
        try 
        {
            // let Tag = await _tagService.find({}) // when passing empty curly brackets in a find method, it finds all items in the db. Or we could spcify a certain itme like this { name: "Hat" }
            let apparel = await _apparelService.find({ tags: req.params.id }) // tags is beind used to check match and we get id from request params where we can find the id
                .populate("tags") 
            return res.send(apparel) // return all Tags to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to create a new Tags
    async addTag(req, res, next) {
        try 
        {
            let newTag = await _tagService.create(req.body) // mongo create method and we passing in a request body as a param. As mentioned above we have an access to all functionality of the db thorugh the service (see implementation) 
            return res.send(newTag) // return a new Tag
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to edit an Tag. it's called from request
    async editTag(req, res, next) {
        try 
        {
            let editedTag = await _tagService.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }) // args" (id of the Tag to edit, what to edit, return edited one or old)
            return res.send(editedTag) // return an edited Tag
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to delete an Tag. it's called from request
    async deleteTag(req, res, next) {
        try 
        {
            let editedTag = await _tagService.findOneAndDelete({_id: req.params.id}) // args" (id of the Tag to delete (in our case by id))
            return res.send("Deleted") // return an edited Tag
        } 
        catch (error) 
        {
            next(error)
        }
    }
}