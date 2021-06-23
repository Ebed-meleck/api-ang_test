const jwt = require("jsonwebtoken");

const authEndecode = (req, res, next) => {
  try {
    const secret = process.env.SESSION_HASH;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
exports.authEndecode = authEndecode;
