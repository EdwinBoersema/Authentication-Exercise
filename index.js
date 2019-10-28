const
    express = require("express"),
    app = express();
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Flaters",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/Auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("Connected to database")
);

passport.use(new localStrategy(User.authenticate()));
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

//=================
// Auth Routes

// show sign up form
app.get("/register", (req, res) => {
    res.render("register");
});

// handling user sign up
app.post("/register", (req, res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, () =>{
                res.redirect("/secret");
            });
        }
    });
});

//==============
// LOGIN Routes

// render the login form
app.get("/login", (req, res) =>{
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
    
});

app.listen(3000, () => console.log("Server started!"));