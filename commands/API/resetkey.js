const { Command } = require("klasa");
const crypto = require("crypto");

class Resetkey extends Command {
  constructor(...args) {
    super(...args, {
      description: "Get a new BananAPI token.",
      name: "resetkey",
      aliases: ["rk", "rkey", "reset"],
      cooldown: 1800
    });
  }

  async run(msg) {   
    const res = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [msg.author.id]);
    if (!res.rows.length) return msg.send("You don't even have a token yet! WHAT?!");
    await this.client.db.query("DELETE FROM tokens WHERE userid = $1", [msg.author.id]);
    const token = crypto.randomBytes(32).toString("hex");
    await this.client.db.query("INSERT INTO tokens (userid, token) VALUES ($1, $2)", [msg.author.id, token]);
    await msg.author.send(`You decided to reset your token. I decided to get your token reset. Logic. \n\nHere's your new token, by the way:\n\n\`${token}\``);
    await msg.reply("I regenerated your token. Hope you're happy! (This command will be on cooldown for the next 30 minutes.)");
  }
}


module.exports = Resetkey;


