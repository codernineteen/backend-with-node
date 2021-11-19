const express = require('express');
const path = require('path');

const app = express();

//setup static and middleware
app.use(express.static('./public'))


// app.get('/' , (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// })


app.all('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

app.listen(5000, () => {
    console.log('Server running, port : 5000')
})

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen