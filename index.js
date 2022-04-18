const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/game", (req, res) => {
    res.render("game");
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});