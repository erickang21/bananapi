const { Command } = require("klasa");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "gettoken",
      description: "Get the token of others.",
      permissionLevel: 10,
      usage: "[user:user]"
    });
  }

  async run(msg, [user]) {
    const res = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [user.id]);
    if (!res.rows.length) return msg.send(`**${user.tag}** doesn't have a token yet! How sad is that?`);
    await msg.author.send(`You are viewing **${user.tag}**'s token.\n\n\`${res.rows[0].token}\``);
    await msg.send(`I got **${user.tag}**'s token for you! Check our DMs for it.`);
  }
};
