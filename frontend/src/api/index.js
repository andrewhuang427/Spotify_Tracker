import axios from "axios";
import { getTokens } from "../utils/index";
import querystring from "querystring";

export const tokens = getTokens();

const headers = {
  Authorization: `Bearer ${tokens.access_token}`,
  "Content-Type": "application/json",
};

export const getUser = () => {
  return axios.get("https://api.spotify.com/v1/me", { headers });
};

let USER_ID = "";
const getUserId = async () => {
  const user = await getUser();
  console.log(user);
  USER_ID = user.data.id;
};
getUserId();

export const getPlaylists = () => {
  console.log("getting playlists...");
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

export const createPlaylist = (term) => {
  let url = `https://api.spotify.com/v1/users/${USER_ID}/playlists`;

  let playlistName = "Your Top Tracks";

  if (term === "short_term") {
    playlistName += " • Last Month";
  } else if (term === "medium_term") {
    playlistName += " • Past 6 Months";
  } else {
    playlistName += " • All Time";
  }
  console.log(url);

  const data = {
    name: playlistName,
    public: true,
    description: "Compilation of your Top Songs by Spotify Profile Tracker App",
  };

  return axios.post(url, JSON.stringify(data), { headers });
};

export const addSongsToPlaylist = (playlistId, tracks) => {
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const trackList = [];

  tracks.forEach((track) => {
    let trackId = track.id;
    let str = "spotify:track:" + trackId;
    trackList.push(str);
  });

  const data = {
    uris: trackList,
  };

  return axios.post(url, JSON.stringify(data), { headers });
};

export const getPlaylist = (playlistId) => {
  let url = `https://api.spotify.com/v1/playlists/${playlistId}`;

  return axios.get(url, { headers });
};
