class RatelimitHandler extends Map {
  constructor() {
    super();
    this.data = {
      code: 429,
      message: "Hey, Stop sending too many requests.",
      exceedLimit: 10,
      clearAfter: 15000
    };
    this.timeMap = new Map();
    this.interval = setInterval(this.clear.bind(this), this.data.clearAfter);
  }

  /**
   * Adds the total requests the user has made or set it to 1.
   * @param {string} mapKey The key
   */
  add(mapKey) {
    if (this.get(mapKey)) this.set(mapKey, this.get(mapKey) + 1);
    else this.set(mapKey, 1);
    return this.get(mapKey);
  }

  /**
   * Subtracts 1 from the key
   * @param {string} mapKey The key to decrease
   */
  subtract(mapKey) {
    if (this.get(mapKey)) this.set(mapKey, this.get(mapKey) - 1);
    return this.get(mapKey);
  }

  async handle(req, res, next) {
    const currentRequests = this.add(req.ip);
    const timeLeft = this.resetTime(req.ip);

    req.rl = {
      currentRequests,
      limit: this.data.exceedLimit,
      remaining: this.data.exceedLimit - currentRequests,
      timeLeft
    };

    res.setHeader("RL-Limit", this.data.exceedLimit);
    res.setHeader("RL-Remaining", this.data.exceedLimit - currentRequests);
    res.setHeader("RL-Reset", timeLeft);

    if (currentRequests >= this.data.exceedLimit) {
      res.status(this.data.code).json({
        ok: false,
        message: this.data.message
      });
      return;
    }

    res.on("finish", () => { if (res.status === 429) this.subtract(req.ip); });
    return next();
  }

  resetTime(key) {
    if (this.timeMap.get(key)) return this.get(key);
    this.timeMap.set(key, parseInt(((Date.now() / 1000).toFixed(0), 10)) + (this.data.clearAfter / 1000));
    return this.get(key);
  }

}

module.exports = RatelimitHandler;