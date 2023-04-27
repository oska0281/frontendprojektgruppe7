
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database:"websitedb"
})

app.post("websitedb", (req,res) => {
    const sql = "INSERT INTO brugere (`navn`,`email`,`kodeord`) VALUES (?)";
    const values =[
        req.body.navn,
        req.body.email,
        req.body.kodeord
    ]

    db.query(sql, [values], (err, data)=> {
        if(err){
            return res.json("Fejl");
        }
        return res.json(data)
    })
})



app.listen(8081, ()=> {
    console.log("listening");
})
