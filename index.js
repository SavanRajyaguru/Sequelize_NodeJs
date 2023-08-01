const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
// const config = require('./config/config')
const allRoute = require('./routes')
const db = require('./models')


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use('/api', allRoute)

app.all('*', (req, res) => { 
    return res.status(404).json({ status: false, msg: 'Route not found!' })
})

app.listen(5000, (err) => { 
    if (err) {
        console.log('Error on listen', err)
    }
    console.log(`Server is running on 5000`)
})

