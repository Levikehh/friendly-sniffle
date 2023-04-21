import { NextFunction, Request, Response } from "express";

const { ERROR_MESSAGES } = require("@/constants");

const hasAccess = (minimumAccessLevel: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies)
    if (!req.body.userId) return res.status(400).send(ERROR_MESSAGES["400"]);
    if (!req.body.accessLevel)
      return res.status(400).send(ERROR_MESSAGES["400"]);
    if (Number(req.body.accessLevel) < Number(minimumAccessLevel))
      return res.status(401).send(ERROR_MESSAGES["401"]);
    delete req.body.userId;
    delete req.body.accessLevel;
    next();
  };
};

module.exports = hasAccess;
