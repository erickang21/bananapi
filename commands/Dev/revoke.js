const { Command } = require("klasa");


class Revoke extends Command {
  constructor(...args) {
    super(...args, {
      description: "Revoke a user's token.",
      name: "revoke",
      permissionLevel: 1,
      usage: "[user:member][reason:str]"
    });
  }

  async run(msg, [user, reason]) {   
        if (!msg.author.id === '338600456383234058' || !msg.author.id === '292690616285134850' || !msg.author.id === '478675118332051466' || !msg.author.id === '304737539846045696') return msg.send("You do not have perms to do that.")
    const res = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [user.user.id]);
    if (!res.rows.length) return msg.send("An error occurred. The user may not have a token yet.");
    await this.client.db.query("DELETE FROM tokens WHERE userid = $1", [user.user.id]);
    await user.send(`Hiya again. This may be awkward, but your BananAPI token was revoked. Here's why:\n\n${reason}\n\nSorry, mate. You can apply again if you want. \nWell, I'm out. Until next time!`);
    const role = msg.guild.roles.get("511256854886875145");
    user.roles.remove(role);
    await msg.send(`OOF! **${user.user.tag}** got their token revoked.`);
  }
}


module.exports = Revoke;


