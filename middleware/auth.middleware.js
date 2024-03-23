import { verifyAuthToken } from "../utils/Auth.js";

export async function validateTokenMiddleware(req, res, next) {
  const auth_headers = req.headers.authorization;
  const token = auth_headers?.split(" ")[1];
  try {
    const payload = verifyAuthToken(token);
    req["user_id"] = payload["user_id"];
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
