import bcrypt from "bcrypt";
import { generateAccessToken } from "../../utils/auth.js";
import User from "../user/user.model.js";

export async function login(username, password) {
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    return generateAccessToken(username);
  }
}

export function checkIsUsernameTaken(username) {
  return User.exists({ username });
}

export async function register(username, password) {
  const encryptedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username: username.toLowerCase(),
    password: encryptedPassword,
  });

  return generateAccessToken(username);
}
