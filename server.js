const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

// app.listen(3000, function () {
//     console.log('listening on 3000')
// })

// app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })


const connectionStr = 'mongodb+srv://windu:starwars_crud@cluster0.qrptoto.mongodb.net/?retryWrites=true&w=majority'
MongoClient.connect(connectionStr)
    .then(client => {
        console.log('connected to database')
        const db = client.db('quotes_crud')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
            const cursor = db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))


