import express from "express";
import Main from "./Main";

const router = express.Router();

export default (): express.Router => {
  Main(router);

  return router;
};
