/**
 *@overview
 *Authenfication user
 *
 *
 * @require lib/db
 */

const db = require("../lib/db");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const loginRoute = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: "Veuillez inserer vos données" });
  } else {
    const { username, password } = req.body;
    const sql = `SELECT *  FROM user 
    WHERE username=? AND password=SHA1(?);   `;
    db.query(sql, [username, password])
      .then((credential) => {
        const users = credential.length === 0;
        if (users) {
          res.status(401).json({ error: "bad username and password" });
        }
        const secret = process.env.SESSION_HASH;
        credential.forEach((user) => {
          let token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: 86400,
          });
          req.session.user = user;
          res.status(201).send({ auth: true, token: token, userId: user.id });
        });
      })
      .catch((err) => {
        next(err);
      });
  }
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
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
