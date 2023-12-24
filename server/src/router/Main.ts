import express from "express";
import { Auth } from "../middlewares/AuthMiddleware";
import {
  // Register,
  // Login,
  // getAll,
  // getNumbers,
  // sendSms,
  // uploadNumbers,
  // Reset,
  Test,
} from "../controllers/";

export default (router: express.Router) => {
  // http://localhost:3000/
  router.get("/", Test);
};
