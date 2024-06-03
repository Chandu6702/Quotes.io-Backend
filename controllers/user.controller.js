import User from "../schema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const ACCESS_TOKEN = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m"
    })

    res.cookie("jwt", ACCESS_TOKEN, {
      httpOnly: true
    })

    return res.status(200).send(JSON.stringify({ status: true }));

  } catch (error) {
    res.send(JSON.stringify({ status: false, error: error.message }));
  }
}

export { userLogin, userSignup };
