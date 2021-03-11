const dotEnv = require("dotEnv");
const helmet = require("helmet");
const session = require("cookie-session");
const body_parser = require("body-parser");
const express = require("express");
const cmRoutes = require("./routes/crmRoutes");
const authRoutes = require("./routes/authRoutes");
const debug = require("debug")("APP");
const http = require("http");
// envrionnement .env
configEnvironnrmentVariable();

const app = express();
const PORT = process.env.PORT;

//helmet

app.use(helmet());
//session and middleware
app.use(
  session({
    secret: process.env.SESSION,
    keys: "user_id",
    secure: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

//routes enpoint
app.use("/auth", authRoutes);
app.use("/contact", cmRoutes);

//started server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

// configuration environnement variable

function configEnvironnrmentVariable() {
  const dotfile = `.env`.trim();
  dotEnv.config({ path: dotfile });
}

//
process.on("uncaughtException", (e) => {
  debug("process.onUncaugghtException: %o", e);
  process.exit(1);
});

process.on("warning", (warning) => {
  debug("process.onWarning: %o", warning);
});
