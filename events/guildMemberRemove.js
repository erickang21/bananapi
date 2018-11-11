const { Event } = require("klasa");

class GuildMemberRemove extends Event {

  async run(member) {
    const res = await this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [member.user.id]);
    if (!res.rows.length) return;
    await this.client.db.query("DELETE FROM tokens WHERE userid = $1", [member.user.id]);
    await this.client.channels.get("492085452430639124").send(`**${member.user.tag}** left the server. I revoked their BananAPI key.`);

  }
}

module.exports = GuildMemberRemove;