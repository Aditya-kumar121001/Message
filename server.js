const express = require("express");
const app = express();
const http = require('http').createServer(app);
const ejs = require('ejs');
const path = require('path')
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const users = [
    {name: 'Aditya'},
    {name: "Aman"},
    {name: "Pari"}
]

app.get('/', function(req, res){
    res.render('index')
});

app.get('/users', function(req, res){
    res.render('users', {users})
});


app.post('/create-user', (req, res) => {
    const {user} = req.body;
    console.log(user)
    res.render('message', {user: user})
    
});

app.use(express.static(__dirname + '/public'));

//socket
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("connected...");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});


http.listen(PORT, () => {
    console.log("server is started");
});