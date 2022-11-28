import { NextFunction, Request, Response } from "express";
const Redis = require("@/utils/redis")();

/**
 *
 * @param {number} time Cache time in seconds
 * @returns
 */

const useCache = (time: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!Redis.isConnected) return next();

    const cachedResponse = await Redis._client.get(req.originalUrl);

    if (cachedResponse) return res.json(JSON.parse(cachedResponse));

    const oldJson = res.json;
    res.json = (content) => {
      Redis._client.set(req.originalUrl, JSON.stringify(content), {
        EX: time >= 0 ? time : null
      });
      return oldJson.call(res, content);
    };

    next();
  };
};

module.exports = useCache;
