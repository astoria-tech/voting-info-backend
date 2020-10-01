const express = require('express');
const axios = require('axios');

const host = '0.0.0.0';
const port = 3000;

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const pollingData = (streetNumber, streetName) =>
  `https://findmypollsite.vote.nyc/api/pollsiteinfo?county=Queens&streetnumber=${streetNumber}&streetname=${streetName}`;

app.get('/api/v1/pollsite/:number/:name', async (req, res, next) => {
  await axios
    .get(pollingData(req.params.number, req.params.name), {
      headers: {
        Referer: 'https://findmypollsite.vote.nyc/',
      },
    })
    .then(apiResponse => {
      res.json(apiResponse.data);
    })
    .catch(err => {
      if (err) res.send(err);
    });
});
app.listen(port, host, () => {
  console.log(`${host} listening on ${port}`);
});
