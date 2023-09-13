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

import myDB from './connection.js'
import { indexRouter } from './routes/index.js'
import { fccTesting } from './freeCodeCamp/fcctesting.js';

const app = express();

// view engine setup
app.set('views', './views/pug');
app.set('view engine', 'pug');

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

// serialize and deserialize user object (convert the object's contents into a key)
passport.serializeUser((user, done) => {
  return done(null, user._id)
})
passport.deserializeUser((user, done) => {
  return done(null, null)
})

app.use('/', indexRouter);
app.use('/_api', fccTesting)

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
