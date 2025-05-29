import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import prisma from "../db.js";
import config from "../config/config.js";
import { encryptPass, comparePass } from "../utils/encryptPass.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await encryptPass(password),
      },
    });

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      config.SECRET,
      {
        expiresIn: "30d",
      }
    );
    const serialized = serialize("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      httpOnly: false,

      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userFound) return res.status(404).json({ message: "User not found" });

    const matchPass = await comparePass(password, userFound.password);
    if (!matchPass) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { userId: userFound.id, name: userFound.name, email: userFound.email },
      config.SECRET,
      {
        expiresIn: "30d",
      }
    );
    const serialized = serialize("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(201).json({ user: userFound });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyTk = async (req, res) => {
  try {
    // get token from cookies
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies.token;
    // check if token exists
    if (!token) return res.status(403).json({ message: "No token provided" });
    // verify token
    const decoded = jwt.verify(token, config.SECRET);
    req.email = decoded.email;

    // get user from token
    const user = await prisma.user.findUnique({
      where: { email: req.email },
    });
    // check if user exists
    if (!user) return res.status(404).json({ message: "No user found" });

    res.status(200).json({ user });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Failed to authenticate token" });
  }
};

export const logout = async (req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
