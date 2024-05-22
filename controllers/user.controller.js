import User from "../schema/UserSchema.js";
import bcrypt from "bcrypt";

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

    if (user == null) res.send(JSON.stringify({ status: false, error: "User not Found" }));

    if (!bcrypt.compareSync(password, user.password))
        res.send(JSON.stringify({ status: false, error: "Incorrect Password" }));

    res.send(JSON.stringify({ status: true }));

  } catch (error) {
    res.send(JSON.stringify({ status: false, error: error.message }));
  }
}

export { userLogin, userSignup };
