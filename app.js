const dotEnv = require("dotEnv");
const helmet = require("helmet");
const session = require("cookie-session");
const body_parser = require("body-parser");
const express = require("express");
const cmRoutes = require("./routes/crmRoutes");
const authRoutes = require("./routes/authRoutes");
const debug = require("debug")("APP");
const http = require("http");
const cors = require("cors");
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
app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

//routes endpoint
app.use("/auth", authRoutes);
app.use("/contact", cmRoutes);

// configuration environnement variable

function configEnvironnrmentVariable() {
  const dotfile = `.env`.trim();
  dotEnv.config({ path: dotfile });
}

module.exports = app;
