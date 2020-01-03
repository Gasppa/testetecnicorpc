const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const consign = require('consign')

let index = require('./routes/index');
let tasks = require('./routes/tasks');

const app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

consign()
    .include('routes')
    .then('./config/dbConnection.js')
    .into(app)

app.listen(3000, () => console.log('server started')); 