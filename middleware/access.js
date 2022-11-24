const {ERROR_MESSAGES} = require("../constants")

const hasAccess = (minimumAccessLevel) => {
  return (req, res, next) => {
    if (!req.body.userId) return res.status(400).send(ERROR_MESSAGES["400"]);
    if (!req.body.accessLevel) return res.status(400).send(ERROR_MESSAGES["400"]);
    if (Number(req.body.accessLevel) < Number(minimumAccessLevel)) return res.status(401).send(ERROR_MESSAGES["401"]);
    next();
  };
};

module.exports = hasAccess;
