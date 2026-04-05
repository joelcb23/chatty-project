import bcrypt from "bcryptjs";
import { sha256 } from "js-sha256";

export const encryptPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

export const comparePassword = async (pass: string, receivedPass: string) => {
  return await bcrypt.compare(pass, receivedPass);
};

export const encryptToken = (token: string) => {
  return sha256(token);
};

export const compareToken = async (token: string, receivedToken: string) => {
  return sha256(token) === receivedToken;
};
