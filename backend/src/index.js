const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const routes = require('./routes');

const app = express();
// jNae4fmNYVbniIq5
mongoose.connect('mongodb+srv://omnistack10:jNae4fmNYVbniIq5@cluster0-ywb68.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);
