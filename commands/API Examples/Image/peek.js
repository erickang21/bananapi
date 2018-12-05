const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent"); 

class peek extends Command {
  constructor(...args) {
    super(...args, {
      description: "Example command for GET /api/peek",
      usage: "[user:user]"
    });
  }

  async run(msg, [user]) {
    const user = user || msg.author;
    const start = Date.now();
    const res = await superagent.get("https://bananapi.ml/api/peek")
      .query({ text: user.displayAvatarURL({ size: 2048 } ) })
      .set({ Authorization: this.client.config.apikey });
    const end = Date.now();
    const attachment = new MessageAttachment(res.body, "peek.png");
    const message = `**URL:** https://bananapi.ml/api/peek\n**API Response Time:** ${end - start} ms`;
    await msg.send(message, attachment);
  }
}



module.exports = peek;


