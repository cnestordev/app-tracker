const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  const target = "https://japp-tracker.herokuapp.com/";

  app.use(
    ["/user", "/auth"],
    proxy({
      target,
      changeOrigin: true,
    })
  );
};
