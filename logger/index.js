const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const keys = require('./config/keys')
require('./models/Event')
console.log('environment:'+ process.env.NODE_ENV)
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(({ connections }) => console.log(
        "name: "+connections[0].name,
        "host: "+connections[0].host,
        "user: "+connections[0].user,
        ' mongoose DB is Successfuly Connected'
        )
    )
    .catch(err => console.log(err));

const Event = mongoose.model('events')

app.post('/log', async (req, res) => {
    const obj = {
        timeStamp: Date.now(),
        time: new Date().toTimeString(),
        date: new Date().toDateString(),
        ...req.body
    }
    const newLog = await new Event(obj).save()
    res.send(newLog.id)
})

app.listen('5001', () => {
    console.log(`Started server on => http://localhost:5001 for Process Id ${process.pid}`)
})