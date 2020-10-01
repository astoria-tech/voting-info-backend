const express = require('express');
const axios = require('axios');

const host = '0.0.0.0';
const port = 3000;

const app = express();

const pollingData = (streetNumber, streetName) =>
  `https://findmypollsite.vote.nyc/api/pollsiteinfo?county=Queens&streetnumber=${streetNumber}&streetname=${streetName}`;

app.get('/api/v1/pollsite/:number/:name', async (req, res) => {
  const apiResponse = await axios
    .get(pollingData(req.params.number, req.params.name), {
      headers: {
        Referer: 'https://findmypollsite.vote.nyc/',
      },
    })
    .catch(err => {
      if (err) res.send(err);
    });
  res.json(apiResponse.data.json());
});
app.listen(port, host, () => {
  console.log(`${host} listening on ${port}`);
});
