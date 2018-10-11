const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

class Apply extends Command {
  constructor(...args) {
    super(...args, {
      description: "Apply for a BananAPI key.",
      name: "apply"
    });
  }

  async run(msg) {
    this.client.db.query("SELECT * FROM tokens WHERE userid = $1", [msg.author.id]).then(async (res) => {
      if (res.rows.length) {
        msg.send("Seriously? Trying to smooch a second token off of me? Lame. (But hey, if you wanted a reminder of your token, it's in our DMs. See how productive I am? :smirk:)");
        return msg.author.send(`Psst...Alright, so here's your token. :^)\n\n\`${res.rows[0].token}\``);
      } 
      msg.channel.send(`${this.client.emojis.get("453321771761008640")} **Sliding into DMs...**`);
      await msg.author.send("Alright! Let's get you started.");
      msg.channel = msg.author.dmChannel;
      const projectName = await msg.prompt("#1: What project are you using this API for? (Project Name)");
      const desc = await msg.prompt("#2: Describe where this API would come in for your project.");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("BananAPI Key Request")
        .addField("Project Name", projectName.content)
        .addField("Project Description", desc.content)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({ format: "png", size: 2048 }));
      await this.client.channels.get("492085452430639124").send("<@277981712989028353>", { embed: embed });
      await msg.author.send("Alright! I have notified the devs, who will get back to you shortly with your API key. You'll hear back from me once you're accepted. GLHF!")
    });
  }
}


module.exports = Apply;