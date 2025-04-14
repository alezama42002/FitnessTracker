import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Authenticates user to make sure they should have access to the api calls
// that need authorization
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Verifys that the token is still valid
const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

// Generates a new accessToken
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2hr" });
};

export { authenticateUser, verifyToken, generateAccessToken };
