const { Command } = require("klasa");
const crypto = require("crypto");

class Accept extends Command {
  constructor(...args) {
    super(...args, {
      description: "Accept a user that applied.",
      name: "accept",
      permissionLevel: 0,
      usage: "[user:member]"
    });
  }

  async run(msg, [user]) {
    if (!msg.author.id === '338600456383234058' || !msg.author.id === '292690616285134850' || !msg.author.id === '478675118332051466' || !msg.author.id === '304737539846045696') return msg.send("You do not have perms to do that.")
    const token = crypto.randomBytes(32).toString("hex");
    const test = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [user.user.id]);
    if (test.rows.length) return msg.send("It looks like this user already has a token!");
    const res = await this.client.db.query("INSERT INTO tokens (userid, token) VALUES ($1, $2)", [user.user.id, token]);
    await user.send(`Hey there! I got some good news for you.\n\nYou've been approved for a token for BananAPI! Here is it below:\n\`${token}\`\n\nBe sure to pass it as an Authorization header to complete your requests.\n\nAlright, won't bother you any more. Enjoy your day!`);
    const role = msg.guild.roles.get("511256854886875145");
    user.roles.add(role);
    await msg.send(`Success! I gave **${user.user.tag}** a token. They'll be happy for sure.`);
  }
}


module.exports = Accept;
