import mongoose from 'mongoose';
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

export async function getMyQuotes(req, res) {
    try {
        const { user, sortby, genre } = req.query

        const author = await User.findOne({ email: user });

        if (!author)
            throw new Error("User not found");

        const query = { author: author };
        const sort = {};

        if (genre != "null")
            query.genres = genre;

        if (sortby != "null")
            sort.createdAt = sortby == "latest" ? -1 : 1;

        let response = await Quote.find(query).sort(sort).populate("author");

        response = response.map((item) => {
            return { _id: item._id, author: item.author, quote: item.quote, liked_by: item.liked_by, isLiked: item.liked_by.some((user) => user._id.equals(author._id)) };
        })

        res.status(200).send(response);
    } catch (error) {
        console.log(error.message);
    }
}

export async function getQuotes(req, res) {
    try {
        const { search, sortby, genre } = req.query
        const user = req.user;

        const author = await User.findOne({ email: user });

        if (!author)
            throw new Error("User not found");

        const query = {};
        const sort = {};

        if (genre != "null")
            query.genres = genre;

        if (sortby != "null") {
            console.log(sortby);
            if (sortby == 'most-liked')
                sort.likes = -1;
            else
                sort.createdAt = sortby == "latest" ? -1 : 1;
        }

        let response = await Quote.find(query).sort(sort).populate("author");

        response = response.map((item) => {
            return { _id: item._id, author: item.author, quote: item.quote, liked_by: item.liked_by, isLiked: item.liked_by.some((user) => user._id.equals(author._id)) };
        })

        res.status(200).send(response);
    } catch (error) {
        console.log(error.message);
    }
}

export async function likeQuote(req, res) {
    try {
        const { id, user } = req.body;

        const liked_user = await User.findOneAndUpdate(
            { email: user },
            { $addToSet: { liked_quotes: new mongoose.Types.ObjectId(id) } },
            { new: true }
        );

        if (!liked_user) {
            return res.status(404).send("User not found");
        }

        const quote = await Quote.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $addToSet: { liked_by: liked_user._id } },
            { new: true }
        );

        if (!quote) {
            return res.status(404).send("Quote not found");
        }
        console.log(user, "liked");
        res.send("ok")
    } catch (error) {
        console.log(error.message);
    }
}

export async function disLikeQuote(req, res) {
    try {
        const { id, user } = req.body;

        const liked_user = await User.findOneAndUpdate(
            { email: user },
            { $pull: { liked_quotes: new mongoose.Types.ObjectId(id) } },
            { new: true }
        );

        if (!liked_user) {
            return res.status(404).send("User not found");
        }


        const quote = await Quote.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $pull: { liked_by: liked_user._id } },
            { new: true }
        );
        console.log("cam");

        if (!quote) {
            return res.status(404).send("Quote not found");
        }
        res.send("ok")
    } catch (error) {
        console.log(error.message);
    }
}