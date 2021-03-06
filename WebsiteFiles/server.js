const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
    rolling: true,
}));

const PORT = 80;
const HOST = '0.0.0.0';
const PATH = __dirname + '/Public/';


var con = mysql.createConnection({
    host: 'StockData',
    user: 'root',
    database: 'stocks',
    password: 'admin'
  });

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.sendFile(PATH + "loginPage.html");
});

app.get("/stocksApp", (req, res) => {
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
    var description = "I Want It";
    var sqlTransactionTable = "INSERT INTO TransactionsTable(transactionDate, tickerSymbol, " + 
        "buyOrSell, numShares, buyOrSellPrice, justificationText) VALUES (NOW(), ?, 'Buy', ?, ?, ?)";
    var sqlPortfolioTable = "INSERT INTO PortfolioTable" +
    "(tickerSymbol, buyPrice, numShares, currentPrice, currentValue, percentage)" +
    "VALUES (?, ?, ?, 0, 0, 0)";
    con.query(sqlTransactionTable, [tickerSymbol, shares, buyPrice, description], function (err, result) {
        if (err) console.log(err);
    });
    con.query(sqlPortfolioTable, [tickerSymbol, buyPrice, shares], function (err, result) {
        if (err) console.log(err);
    });
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