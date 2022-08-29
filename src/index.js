const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')

const route = require('./routes')
const db = require('./config/db');
const { Domain } = require('domain');

const app = express();
const port = 3000;

// for parsing application/json
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Http logger
// app.use(morgan('combined'));

// Template Engine
app.engine('.hbs', hbs.create({
  extname:'.hbs',
  helpers: {
    sum(a, b) {
      return a + b; 
    }
  }
}).engine);
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "resources","views"));
app.use(express.static(path.join(__dirname, "public")));

// Overwrite method
app.use(methodOverride('_method'));

// Connect database
db.connect();

// Route
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})