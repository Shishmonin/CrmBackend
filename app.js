const express = require('express');
const mongo = require('./config/mongo');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/analytics',passport.authenticate('jwt', {session: false}), analyticsRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position',passport.authenticate('jwt', {session: false}), positionRoutes);

module.exports = app;
