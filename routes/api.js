const polka = require("polka");

const app = polka();

const { Canvas } = require("canvas-constructor");
const jsify = require("../jsify.js");
const fs = require("fs").promises;
const crypto = require("crypto");
/**
 * @api {get} /api/humansgood/
 * @apiParam {String} text Text to use.
 */
app.get("/humansgood", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 32) return res.sendStatus(400, { message: "Text must be less than 32 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/humansgood.jpg`);
  const buff = await new Canvas(930, 928)
    .addImage(image, 0, 0, 930, 928)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 525, 780, 140, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/autism", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 40) return res.sendStatus(400, { message: "Text must be less than 40 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/autism.jpg`);
  const buff = await new Canvas(640, 852)
    .addImage(image, 0, 0, 640, 852)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 250, 370, 250, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/8ball", (req, res) => {
  const query = req.query.question;
  if (!query) return res.sendStatus(400, { message: "No question provided." });
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
});

app.get("/trumptweet", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 240) return res.sendStatus(400, { message: "Text must be less than 240 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/trumptweet.jpg`);
  const buff = await new Canvas(1200, 628)
    .addImage(image, 0, 0, 1200, 628)
    .setTextFont("48px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 30, 200, 1100, 50)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/legends", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 11) return res.sendStatus(400, { message: "Text is too long. The limit is 11 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/legends.jpg`);
  const buff = await new Canvas(1080, 1460)
    .addImage(image, 0, 0, 1080, 1460)
    .setTextFont("64px Arial")
    .setTextAlign("left")
    .addText(text, 700, 1425)
    .toBufferAsync(); 
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/disabled", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/disabled_template.jpg`);
  const buff = await new Canvas(384, 744)
    .addImage(image, 0, 0, 384, 744)
    .setTextFont("20px Arial")
    .setTextAlign("left")
    .addText(text, 30, 295)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/sleeptight", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/sleeptight_template.jpg`);
  const buff = await new Canvas(680, 684)
    .addImage(image, 0, 0, 680, 684)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 30, 375, 320, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/abandon", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/abandon_template.jpg`);
  const buff = await new Canvas(764, 768)
    .addImage(image, 0, 0, 764, 768)
    .setTextFont("20px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 50, 450, 300, 20)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/reverse", (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  res.send({ text: text.split("").reverse().join("") });
});

app.get("/alert", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/alert_template.jpg`);
  const buff = await new Canvas(906, 608)
    .addImage(image, 0, 0, 906, 608)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 75, 400, 850, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

app.get("/hash", (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const hash = crypto.createHash("md5").update(text).digest("hex");
  res.send({ text: text, hash: hash });
});

app.get("/jsify", (req, res) => {
  const { text } = req.query;
  if(!text) return res.sendStatus(400, "Missing text");
  return res.send({ text, js: jsify(text) });
});

module.exports = app;
