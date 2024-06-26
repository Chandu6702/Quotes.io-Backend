import User from "../schema/User.schema.js";
import bcrypt from "bcrypt";
import { signJWT, signJWTRefresh } from "../utils/generateJWT.utils.js"
import Session from './../schema/Session.schema.js';

async function userSignup(req, res) {
  try {

    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await User.insertMany({ email: email, password: hash });

    res.send(JSON.stringify({ status: true }));

  } catch (error) {
    res.send(JSON.stringify({ status: false, error: "Email already in use" }));
  }
}

async function userLogin(req, res) {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user == null)
      return res.send(JSON.stringify({ status: false, error: "User not Found" }));

    await Session.findOneAndDelete({ user: email })

    if (!bcrypt.compareSync(password, user.password))
      return res.send(JSON.stringify({ status: false, error: "Incorrect Password" }));

    const ACCESS_TOKEN = signJWT(email);
    const REFRESH_TOKEN = signJWTRefresh(email);

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, { httpOnly: true, sameSite: 'None', secure: true, expires: new Date(Date.now() + 86400 * 1000) })
    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, { httpOnly: true, sameSite: 'None', secure: true, expires: new Date(Date.now() + 15 * 86400 * 1000) })

    await Session.insertMany({ user: email, refreshToken: REFRESH_TOKEN });

    return res.status(200).send(JSON.stringify({ status: true }));

  } catch (error) {
    res.send(JSON.stringify({ status: false, error: error.message }));
  }
}

async function userLogout(req, res) {
  try {
    const user = req.user

    await Session.deleteOne({ user: user });

    res.cookie("ACCESS_TOKEN", " ", { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie("REFRESH_TOKEN", " ", { httpOnly: true, sameSite: 'None', secure: true });

    res.status(200).send({ status: true })
  } catch (error) {
    console.log(error.message);
  }
}

export { userLogin, userSignup, userLogout };
