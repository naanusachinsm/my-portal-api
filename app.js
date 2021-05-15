const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const rt = require("file-stream-rotator");
const connectToDB = require('./services/mongodb.service');
const indexRouter = require('./routes/index');
const {handleErrors} = require('./utils/error');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/user-swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
      credentials: true
    })
);

const logDir = './logs';
if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}
const accessLogStream = rt.getStream({filename:"./logs/access.log", frequency:"daily", verbose: true});
app.use(logger('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to portal' });
});
app.use('/api', indexRouter);

connectToDB();

app.use(handleErrors);


module.exports = app;
