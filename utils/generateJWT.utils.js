import jwt from "jsonwebtoken";

export const signJWT = (user = "") => jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d"
})

export const signJWTRefresh = (user = "") => jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1M"
})