import express from "express";
import { sign } from "jsonwebtoken";
import { COOKIE_NAME } from "../utils/Constants";

export const setCookie = async (res: express.Response) => {
  const token = await sign({ username: "martad" }, process.env.JWT_SECRET + "");

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return token;
};
