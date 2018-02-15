//npm install express --save
//import the express module
var express = require('express')
//import body-parser (parses the body for post/update requests...)
var bodyParser = require('body-parser')
//init a new instanse of express
//app is now an object
var app = express()

//let our express app use bodyParser to parse the body
// parse application/json
app.use(bodyParser.json())

// require - import the module.
const { Pool } = require('pg')

const pool = new Pool({
    user: 'wufejmqhhextlv',
    host: 'ec2-54-235-64-195.compute-1.amazonaws.com',
    database: 'd4bvirnlrbruqo',
    password: '2c2b3bb27889c44c675eac8e9026f2f21f7dc724b65441bef7b2b640a9ce6115',
    port: 5432,
})

//TODO: Database.
var kebabs = [
    {
        "type": "Shish-Ashish",
        "ingredients": [
            "parsley",
            "Soy Beans"
        ],
        "level": "medium-rare"
    },
    {
        "type": "Shish-Kebab",
        "ingredients": [
            "Dill seeds",
            "Lamb chops",
            "Antrikot"
        ],
        "level": "medium-well"
    }
]

app.get('/', (req, res) => {
    //Query database -> res.json(dbResult)
    res.redirect('/homedishes')
})


app.get('/init', (req, httpResponse) => {
    const SQL = 'CREATE TABLE dishes(id SERIAL, type TEXT, ingredients TEXT, level TEXT);'

    pool.query(SQL, (err, dbResult) => {
        if (err) throw err

        httpResponse.json(dbResult)
    })
})


//handle the server nodes:
app.get('/homedishes', (req, res) => {

    const SQL = 'SELECT * FROM dishes'

    pool.query(SQL, (err, dbResult) => {
        if (err) throw err

        res.json(dbResult)
    })
})

app.post('/homedishes', (req, res) => {
    //todo:
    //get the new dish from req body!
    var dish = req.body

    const SQL = 'INSERT INTO dishes(type, ingredients, level) VALUES($1, $2, $3)'

    pool.query(SQL, [dish.type, dish.ingredients, dish.level], (err, dbResult) => {
        if (err) throw err

        res.json(dbResult)
    })
})

//get dish by id... index
app.get('/homedishes/:myId', (req, res) => {
    var idx = req.params.myId //Number:

    const SQL = `SELECT * FROM dishes
                 WHERE id = $1`

    pool.query(SQL, [idx], (err, dbResult) => {
        if (err) throw err

        res.json(dbResult)
    })
})


//delete dish by id... 
app.delete('/homedishes/:myId', (req, res) => {
    var idx = req.params.myId //Number:

    const SQL = 'DELETE FROM dishes WHERE id = $1'

    pool.query(SQL, [id], (err, dbResult) => {
        if (err) throw err

        res.json(dbResult)
    })
})
/**
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
 */

//update by id:
app.put('/homedishes/:id', (req, res) => {
    var dish = req.body
    var id = req.params.id

    const SQL = 'UPDATE dishes SET type = $1, ingredients = $2, level = $3 WHERE id = $4'

    pool.query(SQL, [dish.type, dish.ingredients, dish.level, id], (err, dbResult) => {
        if (err) throw err

        res.json(dbResult)
    })
})

app.listen(process.env.PORT || 3000)

//https://expressjs.com/en/guide/routing.html