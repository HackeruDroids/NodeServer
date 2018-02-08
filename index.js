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
//handle the server nodes:
app.get('/homedishes', (req, res) => {
    res.json(kebabs)
})

app.post('/homedishes', (req, res) => {
    //todo:
    //get the new dish from req body!
    var newKebab = req.body

    //Array.push(kebab)
    kebabs.push(newKebab)
    //fake a positive result...
    res.json({ "sababa": true })
})

//get dish by id... index
app.get('/homedishes/:mid', (req, res)=>{
    var idx = req.params.mid //Number:
    res.json(kebabs[idx])
})

app.listen(3000)