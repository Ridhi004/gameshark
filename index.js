const express = require('express');
const app = express();
const path = require('path')
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('search')
})

app.post('/', (req, res) => {
    const { gamename } = req.body;
    res.render('search',)
})

app.get('/game', (req, res) => {
    const { q } = req.query
    res.render('info', { q })
})

app.get('/stores', (req, res) => {
    res.render('stores')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log("server started");
})

