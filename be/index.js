require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");
const db = require("./database");

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/address/postcode-number/:number", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  // console.log('test ', req.params.number)
  // console.log('test... ', req.app.locals)
  // x(req).then(r => res.end(JSON.stringify(r, null, 2)));
  // var x = db.getAddressByPostcodeNumber(req.params.number);
  db.getAddressByPostcodeNumber(req.params.number)
    .then(result => {
      res.end(JSON.stringify(result, null, 2));
    })
    .catch(error => {
      res.status(500);
      res.end(JSON.stringify({ errorCode: 500, hasError: true }), null, 2);
    });
});

// Not needed
app.use("/address/municipalities", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  db.getMunicipality()
    .then(result => res.end(JSON.stringify(result, null, 2)))
    .catch(error => {
      res.status(500);
      res.end(JSON.stringify({ errorCode: 500, hasError: true }), null, 2);
    });
});

app.listen(3000, () => {
  console.log("Listening......... on port 3000");
});

// db.insertMunicipalities();
// db.insertPostcodes();
// db.insertMunicipalitiesHasPostcode()
// db.getAddressByPostcodeNumber(8806);
