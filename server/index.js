const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

const hellosign = require('hellosign-sdk')({ key: process.env.HELLOSIGN_API_KEY });

const opts = {
  test_mode: 1,
  clientId: '60f263538a0ebaf73b1e3cc745e6d787',
  type: 'request_signature',
  subject: 'The NDA we talked about',
  requester_email_address: 'alice@example.com',
  files: ['NDA.pdf']
};

hellosign.unclaimedDraft.createEmbedded(opts).then((res) => {
  // handle response
}).catch((err) => {
  // handle error
});

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

app.get('/api/account', (req, res)=> {
  console.log('hit')
  hellosign.account.get()
    .then()
    .finally(() => {
      res.end();
    })
})

app.get('/api/requests', (req, res)=> {
  hellosign.signatureRequest.list()
  .then(function(res){
    console.log(res.signature_requests);
  });
})

app.post('/', (req, res) => {
  console.log('Hello API Event Received')
  res.send('Hello API Event Received')
})

app.listen(port, () => {
  console.log(`Express.js app listening at http://localhost:${port}`)
})