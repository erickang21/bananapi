const { Command } = require("klasa");
const crypto = require("crypto");

class Revoke extends Command {
  constructor(...args) {
    super(...args, {
      description: "Revoke a user's token.",
      name: "revoke",
      permissionLevel: 1,
      usage: "[user:user][reason:str]"
    });
  }

  async run(msg, [user, reason]) {   
    await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [user.id])
      .catch(() => msg.send("An error occurred. The user may not have a token yet."));
    await this.client.db.query("DELETE FROM tokens WHERE userid = $1", [user.id]);
    await user.send(`Hiya again. This may be awkward, but your BananAPI token was revoked. Here's why:\n\n${reason}\n\nSorry, mate. You can apply again if you want. \nWell, I'm out. Until next time!`);
    await msg.send(`OOF! **${user.tag}** got their token revoked.`);
  }
}


module.exports = Revoke;


