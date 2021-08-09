const express = require('express');
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const confug = require("./config/connection");
const PORT = process.env.PORT || 3000;
const app = express();
const mysql = require('mysql');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require models for syncing 
const db = require("DB");

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

//Routes
require("./controllers/api/apiroutes");
require("./config/middleware/auth");

app.get("/", (req, res) => {
  const { search, location, country = 'us' } = req.query;
  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
  console.log(chalk.green(`Proxy GET request to : ${targetURL}`));
  axios.get(targetURL)
    .then(response => {
      res.writeHead(200, headers);
      res.end(JSON.stringify(response.data));
    })
    .catch(response => {
      console.log(chalk.red(response));
      res.writeHead(500, headers);
      res.end(JSON.stringify(response));
    });
})

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(chalk.green('Server listening'));
  });
});