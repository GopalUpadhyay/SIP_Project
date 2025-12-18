import jwt from "jsonwebtoken";

const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    // Only set secure cookies in production (avoid blocking cookie on localhost when NODE_ENV is undefined)
    secure: process.env.NODE_ENV === "production",
    // Use 'none' in production for cross-site scenarios; use 'lax' during development to be accepted over HTTP
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};

export default createJWT;
