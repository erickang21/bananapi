const { Command } = require("klasa");


class Token extends Command {
  constructor(...args) {
    super(...args, {
      description: "View your BananAPI token.",
      name: "token"
    });
  }

  async run(msg) {   
    const res = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [msg.author.id]);
    if (!res.rows.length) return msg.send("Looks like you don't have a token yet. Get one, with `b.apply`.");
    await msg.author.send(`Here's your token! Just like you asked.\n\n\`${res.rows[0].token}\``);
    await msg.send("Got your token! It's in your DMs.");
  }
}


module.exports = Token;


