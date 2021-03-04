const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))

const PORT = 80;
const HOST = '0.0.0.0';
const PATH = __dirname + '/Public/';

var con = mysql.createConnection({
    host: 'StockData',
    user: 'root',
    database: 'StockData',
    password: 'admin'
  });

// app.get('/connect', (req, res) => {
// con.connect(function(err) {
//         if (err) console.log(err);
//         console.log("Connected!");
//     });

//     res.send("ok");
// });

app.get("/", (req, res) => {
    res.sendFile(PATH + "landingPage.html");
});

app.get("/getStocks", (req, res) => {
    var sql = "SELECT * FROM PortfolioTable";
    con.query(sql, function(err, result) {
        if (err) console.log(err);
        res.json(result);
    })
});

app.post("/buyStock", (req, res) => {
    var tickerSymbol = req.body.stockTicker;
    var buyPrice = req.body.buyPrice;
    var shares = req.body.shares;
});

function updateData() {
    const { spawn } = require('child_process');
    const pyProg = spawn('python3', ['./test.py']);
    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
    });
}

console.log('up and running');
app.listen(PORT,HOST);
//setInterval(updateData, 2500);