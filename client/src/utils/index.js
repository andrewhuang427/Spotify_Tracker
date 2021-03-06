/**
 * Extract access and refresh tokens from URL
 */
export const getTokens = function () {
  const urlParams = new URLSearchParams(window.location.pathname.substring(1));
  const access_token = urlParams.get("access_token");
  const refresh_token = urlParams.get("refresh_token");
  return { access_token, refresh_token };
};

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
