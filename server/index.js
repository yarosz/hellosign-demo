const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());


app.get('/api/test', (req, res) => {
  axios.get(`https://${process.env.HELLOSIGN_API_KEY}:@api.hellosign.com/v3/account`)
  .then((data) => {
    res.send(data.data)
    console.log('node', data.data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    res.end();
  })
})


app.post('/', (req, res) => {
  console.log('Hello API Event Received')
  res.send('Hello API Event Received')
})

app.listen(port, () => {
  console.log(`Express.js app listening at http://localhost:${port}`)
})