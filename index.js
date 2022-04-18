const express = require("express");
const app = express();
const port = 8080;
const users = require("./data/users.json")

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

app.get("/users", (req, res) => {
    console.log(users)
    res.status(200).json(users);
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const {email, password} = req.body;
    const newUser = {
        email,
        password,
    };

    users.push(newUser);
    res.status(201).redirect("/login");
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    for(user of users) {
        if(user.email === email && user.password === password) {
            return res.redirect("/game");
        };
    };

    res.status(400).json({
        message: "incorrect email or password"
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});