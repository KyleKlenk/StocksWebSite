import mysql.connector
mydb = mysql.connector.connect(
    host="StockData",
    user="root",
    password="admin",
    database="stocks"
)

mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM TransactionsTable")
results = mycursor.fetchall()
for x in results:
    print(x)
