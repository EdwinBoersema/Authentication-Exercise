const
    express = require("express"),
    app = express();
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");


app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "Flaters",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize);
app.use(passport.session());

app.listen(3000, () => console.log("Server started!"));

mongoose.connect("mongodb://localhost:27017/Auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Connected to database")
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================
// ROUTES
// =================

// HOME
app.get("/", (req, res) => {
    res.render("home");
});

// Secret route
app.get("/secret", (req, res) => {
    res.render("secret");
});

// Auth Routes

// show sign up form
app.get("/register", (req, res) => {
    if (err) {
        console.log(err);
    } else {
        res.render("register");
    }
});