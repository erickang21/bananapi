# JavaScript

**Install with NPM:**
`npm install bananapi`

**Link to NPM:**
[https://www.npmjs.com/package/bananapi](https://www.npmjs.com/package/bananapi)

__**Usage Example**__

```js
// Normal Usage
const BananAPI = require("bananapi");
const fs = require("fs").promises;
const api = new BananAPI.Client({ token: "Your Token Goes here" });
 
(async() => {
 
  // Ping API for reponse time
  const ping = await api.ping();
  console.log(`Pong! ${ping} ms`);
 
  const reversed = await api.reverse("Hello, World!");
  console.log(reversed);
  const eball = await api.eightball("Some question?");
  console.log(`8ball: ${eball.response}, positive: ${eball.isPositive}`);
 
  // Image endpoints
  const image = await api.trumptweet("Hello");
  await fs.writeFile("./image.png", image);
});

// Sending as a message using Discord.js

// Note we required both but you need just one depending on your version
// v11.x.x stable is Attachment
// v12.0.0 dev is MessageAttachment
const { Attachment, MessageAttachment } = require("discord.js");
 
const image = await api.disabled("something");
message.channel.send(new MessageAttachment(image, "file.png"));
```