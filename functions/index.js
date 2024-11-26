const functions = require("firebase-functions");
const next = require("next");

const server = next({
  dev: false,
  conf: { distDir: ".next" }, // Utilisez ".next" si vous n'avez pas exporté statiquement
});

const handle = server.getRequestHandler();

exports.nextApp = functions.https.onRequest((req, res) => {
  return server.prepare().then(() => handle(req, res));
});
