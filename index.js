const express = require('express');
const cors = require('cors');
const router = require('./routes');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

const app = express();
app.use(cors({ origin: true, methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));

const port = process.env.port || 3000; 
app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});

app.use(express.json());
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('DB connected');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;