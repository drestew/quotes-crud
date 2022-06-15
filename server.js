const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.listen(3000, function () {
    console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})

async function connectDatabase() {
    const connect = await MongoClient.connect('mongodb+srv://windu:starwars_crud@cluster0.qrptoto.mongodb.net/?retryWrites=true&w=majority')
    const db = await connect.db('quotes_crud')
    console.log('connected to database')
    // if (err) return console.error(err)
}

connectDatabase()