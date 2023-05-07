const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const http = require('http');
const server = http.createServer(app);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const io = new Server(server);

const route = require('./routes')
const db = require('./config/db');

// IO config
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('notify count', (msg) => {
        io.emit('notify count', msg);
    })
});

// ENV config
dotenv.config();

// for parsing application/json
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// SESSION
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://lehungtin11:1234@cluster0.37hj6ra.mongodb.net/educations' })
  
}));

// Http logger
// app.use(morgan('combined'));

// Template Engine
app.engine('.hbs', hbs.create({
  extname:'.hbs',
  helpers: {
    sum(a, b) {
      return a + b; 
    },
    handlePagination(a, b) {
      return (
        // If have 'a' then go next statement
        // If 'a' gt 0 and 'a' lt 'b' then return a
        // else return falsy ('')
          a ? ((a > 0) && (a <= b ? a : '') && a) : ''
      )
    },
    isAdmin(user) {
      return (
        // Note to fix this hardcode later
        ( user == 'Lehungtin11' ) ? true : false
      )
    },
    isEqual(rootUser, currentUser) {
      return ((rootUser == currentUser) ? true : false)
    }
  }
}).engine);
// Use view engine & change view path to 'views' folder
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "resources","views"));
//Change static path to 'public' folder
app.use(express.static(path.join(__dirname, "public"))); 

// Overwrite method
app.use(methodOverride('_method'));

// Connect database
db.connect();

// Route
route(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})