const express = require("express");
const path = require("path");
const RLHandler = require("./routes/ratelimits.js");
const passport = require("passport");
const Discord = require("passport-discord");
const session = require("express-session");
const bp = require("body-parser");
const LevelSessionStore = require("level-session-store")(session);
const app = express();

const serve = require("serve-static");
app.use("/docs", (req, res, next) => {
    serve(path.join(__dirname, "docs"));
    next();
});
app.get("/docs", (req, res, next) => res.render("docs/index.html"));

const fs = require("fs").promises;
const mountRoutes = require("./routes");
const { Pool } = require("pg");
const config = require("./config.json");
console.log(`CLIENT SECRET: ${config.secret}`);
const md = require("markdown-it")({
  langPrefix: "lang-"
});

app.db = new Pool({
  host: "localhost",
  user: "bananaboy21",
  password: config.password,
  database: "bananapi"
});

const BananAPIClient = require("./bot.js");

const client = new BananAPIClient(app);
client.login();
client.on("ready", () => {
  client.console.log("Client logged in.");
});

app.client = client;
app.db.connect();
client.console.log("Connected to PSQL DB.");
app.cache = {};

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new Discord.Strategy({
  clientID: 496455297959985167,
  clientSecret: config.secret,
  callbackURL: "https://bananapi.ml/login",
  scope: ["identify"]
}, (_, __, profile, done) => {
  process.nextTick(() => {
    return done(null, profile);
  });
}));

app.use(session({
  cookie: {
    maxAge: 31536000000
  },
  secret: "secret",
  saveUninitialized: true,
  resave: true,
  store: new LevelSessionStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api", (req, res, next) => {
  const auth = req.headers["authorization"]; // Get Header
  if(!auth) return res.status(401);
  // If it is already an invalid token cached don't re request db
  if(app.cache[auth] === false) res.status(401);
  // If it cached and valid next() and pass control to other routes
  if(app.cache[auth] === true) return next();
  // No cache = ask Database
  app.db.query("SELECT * FROM tokens WHERE token = $1", [auth]).then((res) => {
    if(!res.rows.length) { // If no results in query
      app.cache[auth] = false; // Recognize this key is invalid if they re request
      return res.status(401);
    }
    app.cache[auth] = true; // Cache it for later requests
    return next(); // Query returned results so we know token is right
  });
});

const handler = new RLHandler();
app.use("/api", (req, res, next) => {
  handler.handle.bind(handler);
  next();
});

mountRoutes(app);

// Homepage
app.get("/", async (req, res) => {
  const dbCount = await app.db.query("SELECT COUNT(*) FROM tokens");
  const users = dbCount.rows[0].count;
  res.render("index.ejs", {
    authorized: req.isAuthenticated(), count: users, bananapfp: app.client.users.get("277981712989028353").displayAvatarURL({ format: "png", size: 2048 }), tntpfp: app.client.users.get("292690616285134850").displayAvatarURL({ size: 2048 })
  });
});

app.get("/ping", (req, res) => {
  res.send({ data: "Pong!" });
});

app.get("/support", (req, res) => {
  res.render("support.ejs");
});

app.get("/examples", async (req, res) => {
  const markdown = await fs.readFile("./markdown/examples.md");
  res.render("examples.ejs", {
    code: md.render(markdown.toString())
  });
});

app.get("/libs", async (req, res) => {
  const markdown = await fs.readFile("./markdown/libs.md");
  res.render("libs.ejs", {
    code: md.render(markdown.toString())
  });
});


app.get("/login", passport.authenticate("discord", {
  failureRedirect: "/"
}), (req, res) => res.redirect("/"));

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(3000, (err) => {
  if(err) throw err;
  // eslint-disable-next-line no-console
  console.log("Listening on port 3000!");
});
