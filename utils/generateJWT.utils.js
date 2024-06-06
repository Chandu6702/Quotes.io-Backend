import jwt from "jsonwebtoken";

export const signJWT = (user = "") => jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m"
})