const { renderFile } = require("ejs");
const { join } = require("path");
const send = require("@polka/send-type");
const views = join(__dirname, "views");

module.exports = (req, res, next) => {
  res.render = (file, data = {}, status = 200) => {
    return renderFile(join(views, file), data, (err, html) => {
      if (err) return send(res, 500, err.message || err);
      return send(res, status, html, {
        "content-type": "text/html"
      });
    });
  };
  return next();
};
