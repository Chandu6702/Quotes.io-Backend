import jwt from "jsonwebtoken";

async function verifyJWT(req, res, next) {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        console.log(token);
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decode);
        if (!decode)
            res.send("not authorized")
        next()
    } catch (error) {
        console.log(error.message);
        res.send("not authorized")
    }
}

export { verifyJWT };