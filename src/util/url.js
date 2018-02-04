export const getHashValue = (key, window) => {
  var matches = window.location.hash.match(new RegExp(key+'=([^&]*)'));
  return matches ? matches[1] : null;
};
