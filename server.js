const express = require('express');
const axios = require('axios');

const host = '0.0.0.0';
const port = 3000;

const app = express();

const pollingData = (streetNumber, streetName) =>
  `https://findmypollsite.vote.nyc/api/pollsiteinfo?county=Queens&streetnumber=${streetNumber}&streetname=${streetName}`;

app.get('/', async (req, res) => {
  const { streetNumber } = req.query;
  const { streetName } = req.query;
  const apiResponse = await axios
    .get(pollingData(streetNumber, streetName), {
      headers: {
        Referer: 'https://findmypollsite.vote.nyc/',
      },
    })
    .catch(err => {
      if (err) res.send(err);
    });
  res.send(apiResponse.data);
});
app.listen(port, host, () => {
  console.log(`${host} listening on ${port}`);
});
