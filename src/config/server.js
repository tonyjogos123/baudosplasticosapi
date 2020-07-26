const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const registerRoute = require('../routes/register');
const loginRoute = require('../routes/login');
const mercadoriaRoutes = require('../routes/mercadoria');
const notasRoutes = require('../routes/notas');

app.use('/register', registerRoute);
app.use('/login',loginRoute);
app.use('/mercadoria',mercadoriaRoutes);
app.use('/notas',notasRoutes);

app.listen(process.env.PORT || 3000);