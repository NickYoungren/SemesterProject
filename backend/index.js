import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import mongoose from "mongoose"
import ProductsDAO from "./dao/productsDAO.js"
import AuthDAO from "./dao/authDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8080

mongoose 
 .connect(process.env.PRODUCTS_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


MongoClient.connect(
    process.env.PRODUCTS_DB_URI,
    {
        maxPoolSize: 50,
        socketTimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ProductsDAO.injectDB(client)
    await AuthDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})