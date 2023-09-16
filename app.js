import 'dotenv/config'
import createHttpError from 'http-errors';
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import session from 'express-session';
import passport from 'passport';
import { ObjectId } from 'mongodb';

import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

import { main as myDB } from './connection.js';
import { indexRouter } from './routes/index.js'
import { fccTesting } from './freeCodeCamp/fcctesting.js';

const app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pug'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

myDB(async client => {
  const myDatabase = await client.db('database').collection('users')
  app.use(indexRouter)
  // serialize and deserialize user object (convert the object's contents into a key)
  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })
  passport.deserializeUser((user, done) => {
    const doc = myDatabase.find({
      _id: new ObjectId(id)
    })
    return done(null, doc)
  })
}).catch(e => {
  app.get('/', (req, res) => {
    res.render('index', {
      title: e,
      message: 'Unable to connect to database'
    })
  })
})

app.get('/_api', fccTesting)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export {
  app
}
