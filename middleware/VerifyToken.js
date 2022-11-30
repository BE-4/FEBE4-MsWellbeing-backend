const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (token == null) return res.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403);
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  },
};
