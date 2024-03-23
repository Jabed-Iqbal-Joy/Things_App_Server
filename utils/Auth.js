import jwt from "jsonwebtoken";

export function createAuthToken(user_id) {
  const token = jwt.sign({ user_id }, "secret");
  return token;
}

export function verifyAuthToken(token) {
  // console.log(token);
  const payload = jwt.verify(token, "secret");
  return payload;
}
