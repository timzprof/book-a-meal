const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(adminRoutes);
app.use(userRoutes);

app.listen(4000);
