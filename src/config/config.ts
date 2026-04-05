export default {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET_KEY || "secret",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET_KEY || "secret",
};
