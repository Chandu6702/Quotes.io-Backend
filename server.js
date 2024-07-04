import app from "./app.js";
import dbConnect from "./database/dbConnect.js";

dbConnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
