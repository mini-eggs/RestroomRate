//@flow

import { sign as CreateToken, verify as VerifyToken } from "jsonwebtoken";

type TokenData = {
  userID: number
};

/**
 * Create a token base on object provided.
 */
export function createToken(tokenData: TokenData) {
  return CreateToken(tokenData, process.env.TOKEN);
}

function tokenFail(res) {
  res.json({
    message: "No valid token",
    status: false
  });
}

/**
 * Verify that a token exists and is valid.
 */
export function checkTokenMiddleware(req: any, res: any, next: Function) {
  const { token } = req.body;

  if (typeof token === "undefined") {
    tokenFail(res);
    return;
  }

  VerifyToken(token, process.env.TOKEN, (error, decoded: TokenData) => {
    if (error) {
      tokenFail(res);
      return;
    }

    req.body.token = decoded;
    next();
  });
}
