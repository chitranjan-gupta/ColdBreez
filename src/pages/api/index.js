const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const publicVapidKey =
  "BDxb3Jt4H0sZrPK_X3UyU9nthpQIVCml89qxbuMsqvbgXne6aj-h4eHS6DDfEsBcggJIRKPoL8dloDGjqL3LZF0";
const privateVapidKey = "fa-gI2K13kX01s7nSNmntqjlIV_sCnKa7j0UMeNnw7s";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(200).json({});

  const payload = JSON.stringify({ title: "Push test" });
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

module.exports = app;
