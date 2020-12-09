const axios = require("axios");
const express = require("express");
const path = require("path");
const querystring = require("querystring");
const cors = require("cors");

require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = "http://localhost:8000/callback";
const reactURI = "http://localhost:3000";

const app = express();

app.use(cors());

let storedState = "";

app.get("/login", function (req, res) {
  const scopes =
    "user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public";
  const stateString = generateRandomStateString(25);
  storedState = stateString;

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope: scopes,
      redirect_uri: redirectURI,
      state: stateString,
    })}`
  );
});

app.get("/callback", function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === storedState) {
    const requestBody = {
      grant_type: "authorization_code",
      redirect_uri: redirectURI,
      code: code,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${new Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
    };

    axios
      .post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify(requestBody),
        config
      )
      .then(function (response) {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        res.redirect(
          reactURI +
            "/" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  } else {
    console.log("states keys did not match!");
  }
});

const generateRandomStateString = function (length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
