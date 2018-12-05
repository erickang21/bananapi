const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const superagent = require("superagent"); 

class Alert extends Command {
  constructor(...args) {
    super(...args, {
      description: "Example command for GET /api/alert",
      name: "alert",
      usage: "[text:str]"
    });
  }

  async run(msg, [text]) {
    const start = Date.now();
    const res = await superagent.get("https://bananapi.ml/api/alert")
      .query({ text: text }) // Params
      .set({ Authorization: this.client.config.apikey });
    const end = Date.now();
    const attachment = new MessageAttachment(res.body, "alert.png");
    const message = `**URL:** https://bananapi.ml/api/alert\n**API Response Time:** ${end - start} ms`;
    await msg.send(message, attachment);
  }
}



module.exports = Alert;


