import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/route.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Default
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//route
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
