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


//handle the server nodes:
app.get('/homedishes', (req, res) => {
    //Query database -> res.json(dbResult)
    res.json(kebabs)
})

app.post('/homedishes', (req, res) => {
    //todo:
    //get the new dish from req body!
    var newKebab = req.body

    //Push to the database instead
    kebabs.push(newKebab)
    //fake a positive result...
    res.json({ "sababa": true })
})

//get dish by id... index
app.get('/homedishes/:myId', (req, res) => {
    var idx = req.params.myId //Number:
    res.json(kebabs[idx])
})


//delete dish by id... 
app.delete('/homedishes/:myId', (req, res) => {
    var idx = req.params.myId //Number:
    var removedItem = kebabs.splice(idx, 1)

    res.json(removedItem)
})


//update by id:
app.put('/homedishes/:id', (req, res) => {
    var dish = req.body
    var id = req.params.id

    kebabs[id] = dish

    res.json({ "result": kebabs[id] })
})

app.listen(process.env.PORT || 3000)

//https://expressjs.com/en/guide/routing.html