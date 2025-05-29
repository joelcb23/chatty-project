import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";

export const verifyToken = async (req, res, next) => {
  try {
    // get token from cookies
    const cookies = cookie.parse(req.headers.cookie);
    const token = cookies.token;
    // check if token exists
    if (!token) return res.status(403).json({ message: "No token provided" });
    // verify token
    const decoded = await jwt.verify(token, config.SECRET);
    req.email = decoded.email;

    // get user from token
    const user = await prisma.user.findUnique({
      where: { email: req.email },
    });
    // check if user exists
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Failed to authenticate token" });
  }
};
