const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "!nspi0000",
    // Senha PC do meio: !nspi0000
    database: "teste-cafe",
});

const dbAtual = "teste1"

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSelect = `SELECT * FROM ${dbAtual}`
    db.query(sqlSelect, (err, result) => {
        // console.log(result)
        console.log(err)
        res.send(result)
    })
})

app.get('/api/verify', (req, res) => {
    const email = req.query.email

    const sqlCountEmail = `SELECT COUNT(email) FROM ${dbAtual} WHERE email = "${email}"` 
    db.query(sqlCountEmail, (err, result) => {
        console.log(result[0]["COUNT(email)"])
        const countEmail = result[0]["COUNT(email)"]
        if (countEmail < 2) {
            res.send(true)
        } else {
            res.send(false)
        }
        // res.send(result)
    })
})

app.post("/api/insert", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const coffee = req.body.coffee
    const info = req.body.info

    const sqlInsert = `INSERT INTO ${dbAtual} (name, email, coffee, info) VALUES (?,?,?,?)`
    db.query(sqlInsert, [name, email, coffee-1, info], (err, result) => {
        // console.log(result)
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log('running on port 3001')
});