// controller handles requests/responds

import express from 'express'
import ApparelService from '../services/ApparelService';

// expose our model and functionality to talk to db through ApparelService
let _apparelService = new ApparelService().repository

// export default makes the class available outside of this file
// this controller route by default is under '/api/apparel' that corresponds to '' in a get method below. This is a root of the path 
export default class ApparelController 
{
    constructor() {
        this.router = express.Router() // this class needs a Router as a hallway for requests
            .get('', this.getAllApparels) // attach a get method to our Router. Args (specific doorway (nothing in our case, so, it will open up '/api/apparel' = all apparels), function to call)
            .get('/:id', this.getApparelById) // get a certain apparel by id. /api/apparels/2g1g2h1g21h2gh1g21h2g1
            .post('', this.addApparel) // args (add a new apparel to all apparels '/api/apparel', that corresponds '', function to call)
            .put('/:id', this.editApparel) // args (apparel to edit by id (in our case), function to call)
            .delete('/:id', this.deleteApparel) // args (apparel to delete by id (in our case), function to call)
    }

// promise to get Apparels
    async getAllApparels(req, res, next) {
        try 
        {
            // let apparel = await _apparelService.find({}) // when passing empty curly brackets in a find method, it finds all items in the db. Or we could spcify a certain itme like this { name: "Hat" }
            let apparel = await _apparelService.find({})
                .populate("manufacturer") // populate method allows find (get object with data in request) - not only ID. Because id doesn't have a lot of information for us (args: (what you want to get with information. What to populate in our case manufacturer item in our model in db. Ref to another peace of data))
                .populate("tags") // get tags body information. Not only id. 
            return res.send(apparel) // return all apparels to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to get a certain apparel by id
    async getApparelById(req, res, next) {
        try 
        {
            // let apparel = await _apparelService.findById(req.params.id) // req.params.id is a way to get a param /:id from a get request. If it was specified in request such as .get('/:appareId', this.getApparelById) then I would get findById(req.params.apparelId)
            let apparel = await _apparelService.findById(req.params.id).populate("manufacturer") // populate method allows find (get object with data in request) - not only ID. Because id doesn't have a lot of information for us
            return res.send(apparel) // return all apparels to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to create a new apparels
    async addApparel(req, res, next) {
        try 
        {
            let newApparel = await _apparelService.create(req.body) // mongo create method and we passing in a request body as a param. As mentioned above we have an access to all functionality of the db thorugh the service (see implementation) 
            return res.send(newApparel) // return a new apparel
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to edit an apparel. it's called from request
    async editApparel(req, res, next) {
        try 
        {
            let editedApparel = await _apparelService.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }) // args" (id of the apparel to edit, what to edit, return edited one or old)
            return res.send(editedApparel) // return an edited apparel
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to delete an apparel. it's called from request
    async deleteApparel(req, res, next) {
        try 
        {
            let editedApparel = await _apparelService.findOneAndDelete({_id: req.params.id}) // args" (id of the apparel to delete (in our case by id))
            return res.send("Deleted") // return an edited apparel
        } 
        catch (error) 
        {
            next(error)
        }
    }
}