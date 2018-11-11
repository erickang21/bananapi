const polka = require("polka");

const app = polka();

const { Canvas } = require("canvas-constructor");
const fs = require("fs").promises;
const jsify = require("../jsify.js");

const crypto = require("crypto");
const superagent = require("superagent");

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/humansgood/
 * @apiName humansgood
 * @apiGroup Image
 * @apiParam {String} text Text to use (Limit of 32 characters.)
 * @apiUse Error
 * @apiUse auth
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/scroll/
 * @apiName scroll
 * @apiGroup Image
 * @apiParam {String} text Text to use (Limit of 40 characters.)
 * @apiUse Error
 * @apiUse auth
 */
app.get("/scroll", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 40) return res.sendStatus(400, { message: "Text must be less than 40 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/scroll.jpg`);
  const buff = await new Canvas(480, 480)
    .addImage(image, 0, 0, 480, 480)
    .setTextFont("20px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 80, 300, 80, 20)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});


/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/note/
 * @apiName note
 * @apiGroup Image
 * @apiParam {String} text Text to use (Limit of 26 characters.)
 * @apiUse Error
 * @apiUse auth
 */
app.get("/note", async (req, res) => {
  const image = await fs.readFile(`${process.cwd()}/assets/note.jpg`);
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 32) return res.sendStatus(400, { message: "Text must be less than 26 characters." });
  const buff = await new Canvas(720, 676)
    .addImage(image, 0, 0, 720, 676)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 400, 455, 140, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});


/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/retarded/
 * @apiName retarded
 * @apiGroup Image
 * @apiParam {String} image URL of the image to use.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/retarded", async (req, res) => {
  const img = req.query.image || req.query.url;
  if (!img) return res.sendStatus(400, { message: "No image provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/retarded.jpg`);
  const img1 = await superagent.get(img);
  const buff = await new Canvas(640, 640)
    .addImage(image, 0, 0, 640, 640)
    .addImage(img1.body, 320, 0, 320, 320)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});


/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/mock/
 * @apiName mock
 * @apiGroup Text
 * @apiParam {String} text Text to use.
 * @apiUse Error
 * @apiUse auth
 */
app.get("mock", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { messags: "No text provided." });
  const newText = text.split("").reduce((v, c, i) => v += c[i % 2 ? "toLowerCase" : "toUpperCase"]());
  res.json({ text: newText });
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/spit/
 * @apiName spit
 * @apiGroup Image
 * @apiParam {String} firstImage The first image to use.
 * @apiParam {String} secondImage The second image to use.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/spit", async (req, res) => {
  const firstImage = req.query.firstUrl || req.query.firstImage;
  const secondImage = req.query.secondUrl || req.query.secondImage;
  const image = await fs.readFile(`${process.cwd()}/assets/spit.jpg`);
  const img1 = await superagent.get(firstImage);
  const img2 = await superagent.get(secondImage);
  const buff = await new Canvas(497, 378)
    .addImage(image, 0, 0, 497, 378)
    .addImage(img1.body, 0, 0, 252, 190)
    .addImage(img2.body, 0, 190, 252, 190)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/peek/
 * @apiName peek
 * @apiGroup Image
 * @apiParam {String} url Image URL to add to the picture.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/peek", async (req, res) => {
  const imageUrl = req.query.url || req.query.image || req.query.imageURL;
  if (!imageUrl) return res.sendStatus(400, { message: "No image URL was provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/peek.jpg`);
  const resp = await superagent.get(imageUrl);
  const buff = await new Canvas(320, 320)
    .addImage(image, 0, 0, 320, 320)
    .addImage(resp.body, 0, 160, 160, 160)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/autism/
 * @apiName autism
 * @apiGroup Image
 * @apiParam {String} text Text to use. (Limit of 40 characters.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/8ball/
 * @apiName 8ball
 * @apiGroup Text
 * @apiParam {String} question Question to ask the 8 Ball.
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/trumptweet/
 * @apiName trumptweet
 * @apiGroup Image
 * @apiParam {String} text Text to use. (Limit of 240 characters.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/headache/
 * @apiName headache
 * @apiGroup Image
 * @apiParam {String} text Text to use. (Limit of 25 characters.)
 * @apiUse Error
 * @apiUse auth
 */
app.get("/headache", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 25) return res.sendStatus(400, { message: "Text must be less than 25 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/headache.jpg`);
  const buff = await new Canvas(611, 746)
    .addImage(image, 0, 0, 611, 746)
    .setTextFont("48px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 350, 450, 200, 40)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/legends/
 * @apiName legends
 * @apiGroup Image
 * @apiParam {String} text Text to use. (Limit of 11 characters.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/disabled/
 * @apiName disabled
 * @apiGroup Image
 * @apiParam {String} text Text to use. (A limit has not yet been enforced, but it will look ugly if the text is too long. Please test by yourself until we can fix this.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/sleeptight/
 * @apiName sleeptight
 * @apiGroup Image
 * @apiParam {String} text Text to use. (A limit has not yet been enforced, but it will look ugly if the text is too long. Please test by yourself until we can fix this.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/stayawake/
 * @apiName stayawake
 * @apiGroup Image
 * @apiParam {String} text Text to use. Limit of 105 characters.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/stayawake", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 105) return res.sendStatus(400, { message: "Text must be less than 105 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/stayawake.jpg`);
  const buff = await new Canvas(1439, 1359)
    .addImage(image, 0, 0, 1439, 1359)
    .setTextFont("48px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 30, 750, 600, 50)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/hurt/
 * @apiName hurt
 * @apiGroup Image
 * @apiParam {String} text Text to use. Limit of 60 characters.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/hurt", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  if (text.length > 60) return res.sendStatus(400, { message: "Text must be less than 60 characters." });
  const image = await fs.readFile(`${process.cwd()}/assets/hurt.jpg`);
  const buff = await new Canvas(521, 501)
    .addImage(image, 0, 0, 521, 501)
    .setTextFont("24px Arial")
    .setTextAlign("left")
    .addMultilineText("ee eee e e ee e e e ee e e  e ee e  e e e e  e e e e e e  e", 10, 270, 240, 20)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/abandon/
 * @apiName abandon
 * @apiGroup Image
 * @apiParam {String} text Text to use. (A limit has not yet been enforced, but it will look ugly if the text is too long. Please test by yourself until we can fix this.)
 * @apiUse Error
 * @apiUse auth
 */
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

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/reverse/
 * @apiName reverse
 * @apiGroup Text
 * @apiParam {String} text Text to be reversed.
 * @apiUse Error
 * @apiUse auth
 */
app.get("/reverse", (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  res.send({ text: text.split("").reverse().join("") });
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/alert/
 * @apiName alert
 * @apiGroup Image
 * @apiParam {String} text Text to use. (A limit has not yet been enforced, but it will look ugly if the text is too long. Please test by yourself until we can fix this.)
 * @apiUse Error
 * @apiUse auth
 */
app.get("/alert", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const image = await fs.readFile(`${process.cwd()}/assets/alert_template.jpg`);
  const buff = await new Canvas(906, 608)
    .addImage(image, 0, 0, 906, 608)
    .setTextFont("34px Arial")
    .setTextAlign("left")
    .addMultilineText(text, 60, 400, 850, 30)
    .toBufferAsync();
  res.send(buff, { "Content-Type": "image/png" }); 
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/hash/
 * @apiName hash
 * @apiGroup Text
 * @apiParam {String} text Text to transform into a hash.
 * @apiUse Error
 * @apiUse auth
 * @apiSuccess {String} text The text that was sent in the parameters.
 * @apiSuccess {String} hash The resulting hash that was created.
 */
app.get("/hash", (req, res) => {
  const text = req.query.text;
  if (!text) return res.sendStatus(400, { message: "No text provided." });
  const hash = crypto.createHash("md5").update(text).digest("hex");
  res.send({ text: text, hash: hash });
});

/**
 * @apiDefine auth
 * @apiHeader {String} Authorization Your API Key
 */

/**
 * @apiDefine Error
 * @apiError ClientError Something went wrong on your side.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4xx Client Error
 *     {
 *       "message": "An error message of what happened."
 *     }
 */

/**
 * @api {get} /api/jsify/
 * @apiName jsify
 * @apiGroup Text
 * @apiParam {String} text Text to transform into JavaScript-style.
 * @apiUse Error
 * @apiUse auth
 * @apiSuccess {String} text The text that was sent in the parameters.
 * @apiSuccess {String} hash The resulting JSIf-ied text.
 */
app.get("/jsify", (req, res) => {
  const { text } = req.query;
  if(!text) return res.sendStatus(400, "Missing text");
  return res.send({ text, js: jsify(text) });
});

module.exports = app;
