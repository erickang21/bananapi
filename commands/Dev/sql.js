const { Command } = require("klasa");


class SQL extends Command {
  constructor(...args) {
    super(...args, {
      description: "Run an SQL query.",
      name: "sql",
      permissionLevel: 1,
      usage: "<query:str>"
    });
  }

  async run(msg, [query]) {   
    let message;
    const before = Date.now();
    const res = await this.client.db.query(query);
    const after = Date.now();
    message += "```";
    if (!res.rows.length) message += "Empty response.";

    else {
      for (const row of res.rows) message += `${row.toString()}\n`;
    }
    message += "```\n\n";
    message += `:stopwatch: ${after - before} ms`;
    await msg.send(message);
    
  }
}


module.exports = SQL;


