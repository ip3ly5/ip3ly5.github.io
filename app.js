const express = require('express')

const app = express()
const port = 80


app.use(express.static('public'))
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "public/index.html")
})

const fs = require('fs');
const ssrPage = fs.readFileSync("public/ssr.html", "utf8");
app.get("/ssr", (req, res) => {
    return res.send(ssrPage);
}); 

app.listen(port, ()=>{
    console.log('server is listening..')
})