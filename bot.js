const { Client, PermissionLevels } = require("klasa");
const config = require("./config.json");

const permissionLevels = new PermissionLevels()
  .add(0, () => true)
  .add(1, (_, m) => {
    //m.member.roles.has(config.dvr) I tried, I failed. Here have some restoration
    config.devs.includes(m.author.id)
  }, { fetch: true }) 
  .add(10, (_, m) => m.author.id === "277981712989028353" || m.author.id == "302604426781261824" || m.author.id === "292690616285134850" || m.author.id === "304737539846045696", { break: true, fetch: true });


class BananAPIClient extends Client {
  constructor(app) {
    super({
      prefix: "b.",
      regexPrefix: /^((hey,?\s*)?bananapi),?\s*/i,
      commandEditing: true,
      typing: false,
      readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
      permissionLevels,
      fetchAllMembers: true
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
