const polka = require("polka");
const send = require("@polka/send-type");
const path = require("path");
const RLHandler = require("./routes/ratelimits.js");
const app = polka({
  onNoMatch: (_, res) => res.render("404.ejs")
});

const serve = require("serve-static");
app.use("/docs", serve(path.join(__dirname, "docs"), { index: "index.html" }));

const fs = require("fs").promises;
const mountRoutes = require("./routes");
const ejs = require("polka-ejs");
const { Pool } = require("pg");
const config = require("./config.json");

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

const client = new BananAPIClient();
client.login();

app.bot = client;

app.db.connect();
app.cache = {};

app.use((req, res, next) => {
  res.send = send.bind(null, res, 200);
  res.sendStatus = send.bind(null, res);
  next();
});

app.use(ejs());

app.use("/api", (req, res, next) => {
  const auth = req.headers["authorization"]; // Get Header
  if(!auth) return res.sendStatus(401, "Unauthorized"); // If they didn't provide
  // If it is already an invalid token cached don't re request db
  if(app.cache[auth] === false) return res.sendStatus(401, "Unauthorized");
  // If it cached and valid next() and pass control to other routes
  if(app.cache[auth] === true) return next();
  // No cache = ask Database
  app.db.query("SELECT * FROM tokens WHERE token = $1", [auth]).then((res) => {
    if(!res.rows.length) { // If no results in query
      app.cache[auth] = false; // Recognize this key is invalid if they re request
      return res.sendStatus(401, "Unauthorized");
    }
    app.cache[auth] = true; // Cache it for later requests
    return next(); // Query returned results so we know token is right
  });
});

const handler = new RLHandler();
app.use("/api", handler.handle.bind(handler));

mountRoutes(app);

// Homepage
app.get("/", async (req, res) => {
  const dbCount = await app.db.query("SELECT COUNT(*) FROM tokens");
  const users = dbCount.rows[0].count;
  res.render("index.ejs", { count: users, bananapfp: app.client.users.get("277981712989028353").displayAvatarURL({ format: "png", size: 2048 }), tntpfp: app.client.users.get("292690616285134850").displayAvatarURL({ size: 2048 }) });
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

app.listen(3000, (err) => {
  if(err) throw err;
  // eslint-disable-next-line no-console
  console.log("Listening on port 3000!");
});
