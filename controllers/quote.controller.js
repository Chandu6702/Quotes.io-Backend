import Quote from './../schema/Quote.schema.js';

export async function addQuote(req, res) {
    try {
        console.log(req.body);
        res.send("ok")
    } catch (error) {

    }
}