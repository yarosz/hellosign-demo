const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const API_KEY = '3c65a27bcce6fa382ec78037629ca24caeebd7b99ca20cdd38df6284baa77c59';
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.get('/', (req, res) => {
//   res.send('Hello from express!')
// })

app.get('/api/test', (req, res) => {
  axios.get(`https://${API_KEY}:@api.hellosign.com/v3/account`)
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