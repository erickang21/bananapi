const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent"); 

class spit extends Command {
  constructor(...args) {
    super(...args, {
      description: "Example command for GET /api/spit",
      usage: "<user:user>"
    });
  }

  async run(msg, [user]) {
    const start = Date.now();
    const res = await superagent.get("https://bananapi.ml/api/spit")
      .query({ firstImage: msg.author.displayAvatarURL(), secondImage: user.displayAvatarURL()})
      .set({ Authorization: this.client.config.apikey });
    const end = Date.now();
    const attachment = new MessageAttachment(res.body, "spit.png");
    const message = `**URL:** https://bananapi.ml/api/spit\n**API Response Time:** ${end - start} ms`;
    await msg.send(message, attachment);
  }
}



module.exports = spit;


