const polka = require("polka");
const send = require("@polka/send-type");
const app = polka({
  onNoMatch: (req, res) => res.render("404.ejs")
});
const { Canvas } = require("canvas-constructor");
const fsn = require("fs-nextra");
const jsify = require("./jsify.js");
const fs = require("fs").promises;
const crypto = require("crypto");
const { Pool } = require("pg");
const config = require("./config.json");
const { Client } = require("klasa");
const md = require("markdown-it")({ langPrefix: "lang-" });
app.db = new Pool({
  host: "localhost",
  user: "bananaboy21",
  password: config.password,
  database: "bananapi"
});

Client.defaultPermissionLevels
  .add(1, (client, msg) => config.devs.includes(msg.author.id))
  .add(10, (client, msg) => msg.author.id === "277981712989028353");

class BananAPIClient extends Client {
  constructor() {
    super({
      prefix: "b.",
      commandEditing: true,
      typing: false,
      readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
    });
  }

  login() {
    return super.login(config.token);
  }
}


const client = new BananAPIClient();

client.login();

// just for ease of use
client.config = config;
client.db = app.db;
app.db.connect();
app.cache = {};
// test
app.use((req, res, next) => {
  res.send = send.bind(null, res, 200);
  res.sendStatus = send.bind(null, res);
  next();
});

app.use(require("./ejs.js"));

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

// Homepage
app.get("/", async (req, res) => {
  const dbCount = await app.db.query("SELECT COUNT(*) FROM tokens");
  const users = dbCount.rows[0].count;
  res.render("index.ejs", { count: users });
});

app.get("/ping", (req, res) => {
  res.send({ data: "Pong!" });
});

app.get("/support", (req, res) => {
  res.render("support.ejs");
});

app.get("/examples", async (req, res) => {
  const markdown = await fs.readFile("./markdown/examples.md");
  res.render("examples.ejs", { code: md.render(markdown.toString()) });
});


app.get("/api/humansgood", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  if (text.length > 32) res.sendStatus(400, { message: "Text must be less than 32 characters." });
  const image = await fsn.readFile(`${process.cwd()}/assets/humansgood.jpg`);
  const buff = await new Canvas(930, 928)
    .addImage(image, 0, 0, 930, 928)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 525, 780, 140, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/8ball", (req, res) => {
  const query = req.query.question;
  if (!query) { 
    res.sendStatus(400, { message: "No question provided." });
  } else {
    const answers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", " Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Do not count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
    const index = Math.floor(Math.random() * answers.length);
    const choice = answers[index];
    let type;
    if (index < 10) {
      type = "positive";
    } else if (index > 9 && index < 15) {
      type = "neutral";
    } else {
      type = "negative";
    }
    res.send({ question: query, response: choice, type: type });
  }

});



app.get("/api/trumptweet", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  if (text.length > 240) res.sendStatus(400, { message: "Text must be less than 240 characters." });
  const image = await fsn.readFile(`${process.cwd()}/assets/trumptweet.jpg`);
  const buff = await new Canvas(1200, 628)
    .addImage(image, 0, 0, 1200, 628)
    .setTextFont("48px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 30, 200, 1100, 50)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/legends", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  if (text.length > 11) res.sendStatus(400, { message: "Text is too long. The limit is 11 characters." });
  const image = await fsn.readFile(`${process.cwd()}/assets/legends.jpg`);
  const buff = await new Canvas(1080, 1460)
    .addImage(image, 0, 0, 1080, 1460)
    .setTextFont("64px Arial")
    .setTextAlign("left")
    .addText(text, 700, 1425)
    .toBufferAsync(); 
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/disabled", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  const image = await fsn.readFile(`${process.cwd()}/assets/disabled_template.jpg`);
  const buff = await new Canvas(384, 744)
    .addImage(image, 0, 0, 384, 744)
    .setTextFont("20px Arial")
    .setTextAlign("left")
    .addText(text, 30, 295)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/sleeptight", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  const image = await fsn.readFile(`${process.cwd()}/assets/sleeptight_template.jpg`);
  const buff = await new Canvas(680, 684)
    .addImage(image, 0, 0, 680, 684)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 30, 375, 320, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/abandon", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  const image = await fsn.readFile(`${process.cwd()}/assets/abandon_template.jpg`);
  const buff = await new Canvas(764, 768)
    .addImage(image, 0, 0, 764, 768)
    .setTextFont("20px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 50, 450, 300, 20)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/reverse", (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  res.send({ text: text.split("").reverse().join("") });
});

app.get("/api/alert", async (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  const image = await fsn.readFile(`${process.cwd()}/assets/alert_template.jpg`);
  const buff = await new Canvas(906, 608)
    .addImage(image, 0, 0, 906, 608)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 75, 400, 850, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/api/hash", (req, res) => {
  const text = req.query.text;
  if (!text) res.sendStatus(400, { message: "No text provided." });
  const hash = crypto.createHash("md5").update(text).digest("hex");
  res.send({ text: text, hash: hash });
});

app.get("/api/jsify", (req, res) => {
  const { text } = req.query;
  if(!text) return res.sendStatus(400, "Missing text");
  return res.send({ text, js: jsify(text) });
});



app.listen(3000, (err) => {
  if(err) throw err;
  // eslint-disable-next-line no-console
  console.log("Listening on port 3000!");
});
