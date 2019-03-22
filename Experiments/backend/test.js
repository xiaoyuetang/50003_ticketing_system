var unirest = require("unirest");

var req = unirest("GET", "http://localhost:3000/data/mark");

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
