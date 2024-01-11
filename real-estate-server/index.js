const express = require("express");
const cors = require ("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process. env. PORT || 3000;

app.use (cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fcpdfmv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
        // CRUD operation
        const vehicleCollection = client.db("rental-service").collection("vehicles")
        // API for creating a new vehicle post
        app.post("/add-a-vehicle", async(req, res) => {
            const vehicle = req.body;
            // Insert to mongodb
            const result = await vehicleCollection.insertOne(vehicle)
            // console.log(req.body);
            res.send(result);
        });

        // API for fetching all vehicles
        app.get("/all-vehicles", async(req, res) => {
            const result = await vehicleCollection.find().toArray();
            res.send(result);
        });

    } finally {
      //
    }
}

run().catch(console.dir);

app.get('/', (reg, res) => {
    res.send ('Hello Jupitar!')
})

app.listen(port, () => {
    console. log('Example app listening on port ${port}')
})