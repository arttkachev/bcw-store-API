// controller handles requests/responds

import express from 'express'
import ManufacturerService from '../services/ManufacturerService';
import ApparelService from '../services/ApparelService';

// expose our model and functionality to talk to db through ManufacturerService
let _manufacturerService = new ManufacturerService().repository
let _apparelService = new ApparelService().repository

// export default makes the class available outside of this file
// this controller route by default is under '/api/Manufacturer' that corresponds to '' in a get method below. This is a root of the path 
export default class ManufacturerController 
{
    constructor() {
        this.router = express.Router() // this class needs a Router as a hallway for requests
            .get('', this.getAllManufacturers) // attach a get method to our Router. Args (specific doorway (nothing in our case, so, it will open up '/api/Manufacturer' = all Manufacturers), function to call)
            .get('/:id', this.getManufacturerById) // get a certain Manufacturer by id. /api/Manufacturers/2g1g2h1g21h2gh1g21h2g1
            .get('/:id/apparel', this.getApparelByManufacturerId) // get apparels by manufacturerId (path, function to call)
            .post('', this.addManufacturer) // args (add a new Manufacturer to all Manufacturers '/api/Manufacturer', that corresponds '', function to call)
            .put('/:id', this.editManufacturer) // args (Manufacturer to edit by id (in our case), function to call)
            .delete('/:id', this.deleteManufacturer) // args (Manufacturer to delete by id (in our case), function to call)
    }

// promise to get Manufacturers
    async getAllManufacturers(req, res, next) {
        try 
        {
            let Manufacturer = await _manufacturerService.find({}) // when passing empty curly brackets in a find method, it finds all items in the db. Or we could spcify a certain itme like this { name: "Hat" }
            return res.send(Manufacturer) // return all Manufacturers to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to get a certain Manufacturer by id
    async getManufacturerById(req, res, next) {
        try 
        {
            let Manufacturer = await _manufacturerService.findById(req.params.id) // req.params.id is a way to get a param /:id from a get request. If it was specified in request such as .get('/:appareId', this.getManufacturerById) then I would get findById(req.params.ManufacturerId)
             return res.send(Manufacturer) // return all Manufacturers to a client
        } 
        catch (error) 
        {
            next(error)
        }
    }

    async getApparelByManufacturerId(req, res, next) {
        try 
        {
            // use _apparelService because we are seeking for an apparel
            let Apparel = await _apparelService.find({manufacturer: req.params.id}) // {what to find: id = manufacturer: req.params.id } 
             return res.send(Apparel)
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to create a new Manufacturers
    async addManufacturer(req, res, next) {
        try 
        {
            let newManufacturer = await _manufacturerService.create(req.body) // mongo create method and we passing in a request body as a param. As mentioned above we have an access to all functionality of the db thorugh the service (see implementation) 
            return res.send(newManufacturer) // return a new Manufacturer
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to edit an Manufacturer. it's called from request
    async editManufacturer(req, res, next) {
        try 
        {
            let editedManufacturer = await _manufacturerService.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }) // args" (id of the Manufacturer to edit, what to edit, return edited one or old)
            return res.send(editedManufacturer) // return an edited Manufacturer
        } 
        catch (error) 
        {
            next(error)
        }
    }

    // promise to delete an Manufacturer. it's called from request
    async deleteManufacturer(req, res, next) {
        try 
        {
            let editedManufacturer = await _manufacturerService.findOneAndDelete({_id: req.params.id}) // args" (id of the Manufacturer to delete (in our case by id))
            return res.send("Deleted") // return an edited Manufacturer
        } 
        catch (error) 
        {
            next(error)
        }
    }
}