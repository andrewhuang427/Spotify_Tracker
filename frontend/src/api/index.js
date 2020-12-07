import axios from "axios";
import { getTokens } from "../utils/index";
import querystring from "querystring";

export const tokens = getTokens();

const headers = {
  Authorization: `Bearer ${tokens.access_token}`,
  "Content-Type": "application/json",
};

console.log(tokens.access_token);

export const getUser = () => {
  return axios.get("https://api.spotify.com/v1/me", { headers });
};

export const getPlaylists = () => {
  return axios.get("https://api.spotify.com/v1/me/playlists", { headers });
};

export const getTopSongs = (term) => {
  let url = "https://api.spotify.com/v1/me/top/tracks";
  // time range accepts the following values: short_term, medium_term, long_term
  if (term === "short_term" || term === "medium_term" || term === "long_term") {
    const params = {
      time_range: term,
      limit: 50,
    };
    url += "?" + querystring.stringify(params);
  }

  return axios.get(url, { headers });
};

export const getTopArtists = (term) => {
  let url = "https://api.spotify.com/v1/me/top/artists";

  if (term === "short_term" || term === "medium_term" || term === "long_term") {
    const params = {
      time_range: term,
      limit: 50,
    };
    url += "?" + querystring.stringify(params);
  }

  return axios.get(url, { headers });
};
