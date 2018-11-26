const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent"); 

class disability extends Command {
  constructor(...args) {
    super(...args, {
      description: "Example command for GET /api/disability",
      usage: "[user:user]"  
    });
  }

  async run(msg, [user]) {
    const member = user || msg.author;
    const url = member.displayAvatarURL({ size: 2048 });
    const start = Date.now();
    const res = await superagent.get("https://bananapi.ml/api/disability")
      .query({ url: url }) // Params
      .set({ Authorization: this.client.config.apikey });
    const end = Date.now();
    const attachment = new MessageAttachment(res.body, "disability.png");
    const message = `**URL:** https://bananapi.ml/api/disability\n**API Response Time:** ${end - start} ms`;
    await msg.send(message, attachment);
  }
}



module.exports = disability;


