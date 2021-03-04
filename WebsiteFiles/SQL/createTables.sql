CREATE TABLE TransactionsTable(
    id INT AUTO_INCREMENT PRIMARY KEY,
    transactionDate DATETIME,
    tickerSymbol VARCHAR(255),
    buyOrSell VARCHAR(10),
    numShares INT,
    buyOrSellPrice DOUBLE(5, 2),
    justificationText TEXT(30000));

CREATE TABLE PortfolioTable(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tickerSymbol VARCHAR(255),
    buyPrice DOUBLE(5,2),
    numShares INT,
    currentPrice DOUBLE(5,2),
    currentValue DOUBLE(10,2),
    percentage DOUBLE(5,2));