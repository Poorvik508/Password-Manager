const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors')
dotenv.config();

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName='passop'

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
client.connect()
//IDEA:get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray()
  res.json(findResult)
})
//IDEA:save all password
app.post('/', async (req, res) => {
  const password = req.body
  console.log(password)
  const db = client.db(dbName)
   const collection = db.collection('passwords')
 const result = await collection.insertOne(password);
res.status(201).json({ success: true, insertedId: result.insertedId });

   
  
})
//IDEA:delete password
app.delete('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const result = await collection.deleteOne(password)
  res.status(200).json({ success: true, deletedCount: result.deletedCount });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)

})