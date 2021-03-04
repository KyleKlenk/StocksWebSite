INSERT INTO TransactionsTable
    (transactionDate, tickerSymbol, buyOrSell, numShares, buyOrSellPrice, justificationText)
VALUES
    (NOW(), "SNC.TO", "Buy", 32, 32.5, "I Wanted it");

INSERT INTO PortfolioTable
    (tickerSymbol, buyPrice, numShares, currentPrice, currentValue, percentage)
VALUES
    ("SNC.TO", 32.5, 32, 40.5, 400, 49.59)