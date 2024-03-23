import bcrypt from "bcrypt";
import { createAuthToken } from "../utils/Auth.js";

// Database Connect
import getDB from "../database.js";
const db = getDB();

/** POST: http://localhost:3000/api/register */
export async function register(req, res) {
  // console.log(req.body);

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    name: user.name,
    email: user.email,
  });
}

/** POST: http://localhost:3000/api/login */
export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid Email or Password" });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    return res.status(404).json({ message: "Invalid Email or Password" });
  }

  const token = createAuthToken(user.id);
  return res.status(200).json({ message: "Login Successful!!", token });
}
