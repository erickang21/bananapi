const { Client, PermissionLevels } = require("klasa");
const config = require("./config.json");

const permissionLevels = new PermissionLevels()
  .add(1, (m) => config.devs.includes(m.author.id))
  .add(10, (m) => m.author.id === "277981712989028353");

class BananAPIClient extends Client {
  constructor(app) {
    super({
      prefix: "b.",
      commandEditing: true,
      typing: false,
      readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
      permissionLevels
    });

    this.app = app;
    this.db = app.db;
    this.config = config;
  }

  login() {
    return super.login(this.config.token);
  }
}

module.exports = BananAPIClient;
