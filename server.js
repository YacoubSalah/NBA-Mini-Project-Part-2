const express = require("express")
const path = require("path")
const api = require("./server/Router/API")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "Dist")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use("/" , api)


const port = 3010
app.listen(port, function () {
    console.log(`app is listening at port: ${port}`);
})