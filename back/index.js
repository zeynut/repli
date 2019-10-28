const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Hello, back server');
});


app.listen( 3065 , () => {
    console.log('server is running om http://localhost:3065');
})