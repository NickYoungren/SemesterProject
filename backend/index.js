import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ProductsDAO from "./dao/restaurantsDAO.js"
import ReviewDAO from "./dao/reviewDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8080

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
    await ReviewDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})