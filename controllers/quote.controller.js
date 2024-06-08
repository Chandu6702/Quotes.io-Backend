import Quote from './../schema/Quote.schema.js';
import User from './../schema/User.schema.js';

export async function addQuote(req, res) {
    try {
        const { quote, genres } = req.body

        const user = req.user;

        if (!user)
            throw new Error("Invalid user")

        const author = await User.findOne({ email: user })

        if (!author)
            throw new Error("User not found");

        await Quote.insertMany({ author: author, quote: quote, genres: genres })

        res.status(200).send("ok")
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export async function findQuotes(req, res) {
    try {
        const { user, sortby, genre } = req.query

        console.log(user, sortby, genre);

        const author = await User.findOne({ email: user });

        if (!author)
            throw new Error("User not found");

        const query = { author: author };
        const sort = {};

        if (genre != "null")
            query.genres = genre;

        if (sortby != "null")
            sort.createdAt = sortby == "latest" ? -1 : 1;

        let response = await Quote.find(query).sort(sort);

        res.status(200).send(response);
    } catch (error) {
        console.log(error.message);
    }
}