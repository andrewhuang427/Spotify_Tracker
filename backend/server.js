const axios = require("axios");
const express = require("express");
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

/**
 * Endpoint handling user login request received from the frontend
 */
app.get("/login", (req, res) => {
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

/**
 * Endpoint handles callback from API which returns a code and state
 * once user has been properly authenticated. Responds the api using code and state to get 
 * access/refresh tokens
 * 
 */
app.get("/callback", (req, res) => {
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

/**
 * Handles extracting refresh token once initial access token expires
 */
app.get("/refresh", (req, res) => {});

/**
 * Returns a random string to be used as the state given the length of desired string
 * @param {*} length 
 */
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
