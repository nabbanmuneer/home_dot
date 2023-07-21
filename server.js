const express = require('express');
require('dotenv').config();
const homeRouter = require('./routers/homeRouter');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.json());

app.use('/',homeRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});