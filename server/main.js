import express from "express"
import bp from "body-parser"
import ApparelController from "./controllers/ApparelController"
import ManufacturerController from "./controllers/ManufacturerController"
import TagController from "./controllers/TagController"
import DbContext from "./db/dbconfig"

let server = express() // create server
DbContext.connect() // once connect() is a static async method we don't need instance of DbContext and call connect() in this way
let port = 3000

// register middleware
server.use(bp.json());

// register routers (paths)
server.use('/api/apparels', new ApparelController().router) // args (a path of a doorway of this router that's gonna be used when type in an address in the browser, instance to load (in our case router object that is sotred in a router var of class ApparelController))
server.use('/api/manufacturers', new ManufacturerController().router)
server.use('/api/tags', new TagController().router)

server.get('/', (req, res, next) => {
    res.send("bcw-store")
})

// default error handler
server.use((req, res, next) => {
    res.status(404).send("Route not found!")
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(400).send(err)
})

server.listen(port, ()=> {
    console.log("Server is listening to a port:", port);
})
