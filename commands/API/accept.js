const { Command } = require("klasa");
const crypto = require("crypto");

class Accept extends Command {
  constructor(...args) {
    super(...args, {
      description: "Accept a user that applied.",
      name: "accept",
      permissionLevel: 1,
      usage: "[user:user]"
    });
  }

  async run(msg, [user]) {
    const token = crypto.randomBytes(32).toString("hex");
    await this.client.db.query("INSERT INTO tokens (userid, token) VALUES ($1, $2)", [user.id, token])
      .catch(() => msg.send("An error occurred. The user may already have a token."));
    await user.send(`Hey there! I got some good news for you.\n\nYou've been approved for a token for BananAPI! Here is it below:\n\`${token}\`\n\nBe sure to pass it as an Authorization header to complete your requests.\n\nAlright, won't bother you any more. Enjoy your day!`);
    await msg.send(`Success, gave **${user.tag}** a token. They'll be happy for sure.`);
  }
}


module.exports = Accept;
