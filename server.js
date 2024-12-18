import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config()
import { ConnectionDb } from "./dbConfig/dbConfig.js";
const port = process.env.PORT;

ConnectionDb().then(() => {
    app.listen(port, () => {
        console.log("server is on...")
    })

})