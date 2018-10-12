const { Command } = require("klasa");
const { util: { exec } } = require("klasa");


class Update extends Command {
  constructor(...args) {
    super(...args, {
      description: "Updates the bot and the API, then restarts.",
      name: "update",
      permissionLevel: 1
    });
  }

  async run(msg) {
    let message;
    const { stdout, stderr } = await exec("git pull");
    if (stdout) {
      message = `The bot and API was updated. Continuing to restart...\n\nLogs:\n\`\`\`${stdout}\`\`\``;
      await msg.send(message);
      process.exit();
    } else {
      message = `Looks like an error occurred. The bot/API did not restart.\n\nLogs:\n\`\`\`${stderr}\`\`\``;
      await msg.send(message);
    }
  }
}


module.exports = Update;
