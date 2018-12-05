const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const superagent = require("superagent"); 

class eightball extends Command {
  constructor(...args) {
    super(...args, {
      description: "Example command for GET /api/8ball",
      usage: "<text:str>",
      name: "8ball"
    });
  }

  async run(msg, [text]) {
    const start = Date.now();
    const res = await superagent.get("https://bananapi.ml/api/eightball")
      .query({ text: text }) // Params
      .set({ Authorization: this.client.config.apikey });
    const end = Date.now();
    let message = `**URL:** https://bananapi.ml/api/8ball\n**API Response Time:** ${end - start} ms\n\n**__Question__**\n${text}\n\n__**API Response:**__\n`;
    if (res.body.type === "negative") message += ":x: ";
    else if (res.body.type === "neutral") message += ":small_orange_diamond: ";
    else message += ":white_check_mark: ";
    message += res.body.response;
    const em = new MessageEmbed()
      .setTitle("BananAPI - 8ball")
      .setDescription(message)
      .setFooter(`Requested by: ${msg.author.tag}`, msg.author.displayAvatarURL({ size: 2048 }));
    await msg.send(em);
  }
}



module.exports = eightball;


