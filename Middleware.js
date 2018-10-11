class Middleware {

  static logger(req, res, next) {
    const remoteAddress = req.connection.remoteAddress || req.ip;
    const auth = req.headers["authorization"] || null;
               
  }

}
