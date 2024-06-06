import User from "../schema/User.schema.js";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/generateJWT.utils.js"

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

    if (!bcrypt.compareSync(password, user.password))
      return res.send(JSON.stringify({ status: false, error: "Incorrect Password" }));

    const ACCESS_TOKEN = signJWT(email);

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, { httpOnly: true, sameSite: 'None', secure: true })

    return res.status(200).send(JSON.stringify({ status: true }));

  } catch (error) {
    res.send(JSON.stringify({ status: false, error: error.message }));
  }
}

export { userLogin, userSignup };
