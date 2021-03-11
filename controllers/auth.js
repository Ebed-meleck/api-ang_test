/**
 *@overview
 *Authenfication user
 *
 * @require lodash
 * @require lib/db
 */

const db = require("../lib/db");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const loginTest = (req, res, next) => {
  if (req.body === "") {
    res.status(400).json({ error: "Veuillez inserer vos données" });
  } else {
    const { username, password } = req.body;
    const sql = `SELECT *  FROM user 
    WHERE username=? AND password=SHA1(?);   `;
    db.query(sql, [username, password])
      .then((user) => {
        res.status(201).json({ message: "bingo oaky " });
        console.log(user);
      })
      .catch((err) => {
        next(err);
      });
  }
};

const loginRoute = (req, res, next) => {
  const { username, password } = req.body;
  login(username, password)
    .then((credentials) => {
      console.log(credentials);
      const secret = process.env.SESSION_HASH;
      let token = jwt.sign({ id: credentials.user.id }, secret, {
        expiresIn: 86400,
      });
      req.session.user = credentials.user;
      res
        .status(201)
        .send({ auth: true, token: token, user: credentials.user });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  next();
};

const login = async (username, password) => {
  const sql = `SELECT * FROM
    user WHERE username=? AND password=SHA1(?)
  ;`;
  const user = await db.query(sql, [username, password]);
  console.log(user);
  const isUnrecongnisizeUser = user.length === 0;
  if (isUnrecongnisizeUser) {
    throw new Error("Bad username and password");
  }
  const session = await loadSessionInformation(user[0]);
  return session;
};
const logout = (req) => {
  req.session.destroy();
};

const loadSessionInformation = async (user) => {
  const session = {};
  const sql = `SELECT u.id , u.username FROM
  user u WHERE u.id= ?;
  `;
  [session.user] = await db.query(sql, [user.id]);
  return session;
};

exports.loginRoute = loginRoute;
exports.logout = logout;
exports.loginTest = loginTest;
