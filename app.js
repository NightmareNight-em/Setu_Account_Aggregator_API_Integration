const cors = require("cors");
const express = require("express");
const app = express();
const consentCalls = require('./controllers/ExternalAPICalls/CreateAndGetConsent');
const fetchDataCalls = require('./controllers/ExternalAPICalls/CreateSessionAndFetchData');

//middleware
app.use(express.json()); // to allow posting json data
//setting up cors
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the SETU AA Integration" });
});

var consentId = '';

// create consent
app.get("/createConsent", async(req, res) => {
  const consent = await consentCalls.createConsent();
  consentId = consent.id;
  res.send(`<h2>Click on this <a href=${consent.url}>link</a> to approve consent</h2>.`);
});

// use above id to get consent status
app.get("/getConsent/:id", async(req, res) => {
  const { id } = req?.params;
  const consent = await consentCalls.getConsent(id);
  res.json(consent);
});

// once consent status is ACTIVE, create FI data fetch
app.get("/fetchData", async(req, res) => {
  const data = await fetchDataCalls.createSession(consentId);
  res.json(data);
});

//use above consentId to get FI data
app.get("/fetchData/:id", async(req, res) => {
  const { id } = req?.params;
  const data = await fetchDataCalls.fetchData(id);
  res.json(data);
});

module.exports = app;
