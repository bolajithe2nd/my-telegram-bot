import express from "express";
import { VerifyErrors } from "jsonwebtoken";
import { merge } from "lodash";
import { COOKIE_NAME, FORBIDDEN, NOT_LOGGED_IN } from "../utils/Constants";
import { verifyJwtToken } from "../helpers/AuthHelper";
import { throwError } from "../utils/throwError";

export const Auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throwError(NOT_LOGGED_IN);
    }

    const token = authorizationHeader.slice(7);

    if (!token) {
      throwError(NOT_LOGGED_IN);
    }

    const payload: { username: string } | VerifyErrors = await verifyJwtToken(
      token
    );

    if (
      !("username" in payload) ||
      payload.username !== process.env.LOGIN_USERNAME
    ) {
      throwError(FORBIDDEN);
    }

    merge(req, { id: payload });

    return next();
  } catch (error) {
    return res.status(403).json({ error: true, message: error.message });
  }
};
