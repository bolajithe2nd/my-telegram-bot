import express from "express";
// import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import axios from "axios";
import {
  INCORRECT_LOGIN_DETAILS,
  MISSING_PARAMETER,
  SUCCESSFULLY_REGISTERED,
  SUCCESSFULLY_LOGGED_IN,
} from "../utils/Constants";
import { throwError } from "../utils/throwError";
import { setCookie } from "../middlewares";
import { updateRecord } from "../helpers/updateRecord";
import { hashPassword, validateInput } from "../helpers/AuthHelper";

// const prisma = new PrismaClient();
// const tableNames: (keyof PrismaClient)[] = [
//   "airtel",
//   "mtn",
//   "mtn_latest",
//   "nine_mobile",
//   "nine_mobile_latest",
// ];

export const Test = async (req: express.Request, res: express.Response) => {
  res.send("hello world!!");
};

// export const Register = async (req: express.Request, res: express.Response) => {
//   try {
//     const { key, username, password } = req.body;
//     const validated = validateInput(key, username, password);

//     if (validated) {
//       throwError(MISSING_PARAMETER);
//     }

//     const correctKey = bcryptjs.compareSync(key, process.env.AUTH_KEY);
//     if (!correctKey) {
//       throwError("Authentication key is incorrect!");
//     }

//     const existingAdmins = await prisma.sms_admins.count({});
//     if (existingAdmins) {
//       throwError("Cannot have more than one admin account!");
//     }

//     if (password.length < 6) {
//       throwError("Password is too short!");
//     }

//     const hash = hashPassword(password);
//     await prisma.sms_admins.create({
//       data: {
//         username,
//         password: hash,
//       },
//     });

//     res.status(200).json({
//       error: false,
//       message: SUCCESSFULLY_REGISTERED,
//     });
//   } catch (error) {
//     res.json({ error: true, message: error.message });
//   }
// };

// export const Reset = async (req: express.Request, res: express.Response) => {
//   try {
//     const { key, password } = req.body;
//     const validated = validateInput(key, password);

//     if (validated) {
//       throwError(MISSING_PARAMETER);
//     }

//     const correctKey = bcryptjs.compareSync(key, process.env.AUTH_KEY);
//     if (!correctKey) {
//       throwError("Authentication key is incorrect!");
//     }

//     if (password.length < 6) {
//       throwError("Password is too short!");
//     }

//     const { username } = await prisma.sms_admins.findFirst();

//     const hash = hashPassword(password);
//     await prisma.sms_admins.update({
//       where: {
//         username,
//       },
//       data: {
//         password: hash,
//       },
//     });

//     res.status(200).json({
//       error: false,
//       message: "Password reset successfully!",
//     });
//   } catch (error) {
//     res.json({ error: true, message: error.message });
//   }
// };

// export const Login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { username, password } = req.body;

//     const validated = validateInput(username, password);
//     if (validated) {
//       throwError(MISSING_PARAMETER);
//     }

//     const admin = await prisma.sms_admins.findFirst();
//     if (!admin.username || !admin.password) {
//       throwError("No admin username or password!");
//     }

//     const adminExists = await prisma.sms_admins.findUnique({
//       where: {
//         username,
//       },
//     });

//     if (!adminExists) {
//       throwError(INCORRECT_LOGIN_DETAILS);
//     }

//     const correctPassword = bcryptjs.compareSync(
//       password,
//       adminExists.password
//     );

//     if (!correctPassword) {
//       throwError(INCORRECT_LOGIN_DETAILS);
//     }

//     const token = await setCookie(res);

//     res.status(200).json({
//       error: false,
//       message: SUCCESSFULLY_LOGGED_IN,
//       token,
//     });
//   } catch (error) {
//     res.json({ error: true, message: error.message });
//   }
// };

// export const getAll = async (req: express.Request, res: express.Response) => {
//   try {
//     interface Data {
//       [key: string]: {};
//     }
//     const data: Data = {};

//     await Promise.all(
//       tableNames.map(async (tableName: any) => {
//         const table: any = prisma[tableName];
//         const allNumbers = await table.count({});
//         const sentNumbers = await table.count({
//           where: {
//             status: 1,
//           },
//         });

//         data[tableName] = {
//           stat:
//             sentNumbers.toLocaleString() + " / " + allNumbers.toLocaleString(),
//           length: allNumbers,
//         };
//       })
//     );

//     res.status(200).json({
//       error: false,
//       data,
//     });
//   } catch (error) {
//     res.status(400).json({ error: true, msg: error.message });
//   }
// };

// export const getNumbers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     interface Data {
//       [key: string]: [string];
//     }
//     const data: Data = {};

//     await Promise.all(
//       tableNames.map(async (tableName: any) => {
//         const table: any = prisma[tableName];
//         const numbers = await table.findMany({
//           where: {
//             status: 0,
//           },
//           take: 40000,
//         });

//         data[tableName] = numbers;
//       })
//     );

//     res.status(200).json({
//       error: false,
//       data,
//     });
//   } catch (error) {
//     res.status(400).json({ error: true, msg: error.message });
//   }
// };

// export const sendSms = async (req: express.Request, res: express.Response) => {
//   try {
//     const { msisdn, message, table } = req.body;
//     const url = "http://128.199.7.162/scapi/api/sms/send-sms";

//     if (!msisdn || !message || !table) {
//       throwError(MISSING_PARAMETER);
//     }

//     const send = await axios.post(url, {
//       message,
//       msisdn,
//       network: "SMS",
//       code: "3545",
//     });

//     if (send.status !== 200) {
//       throwError(send.statusText);
//     }

//     await updateRecord(msisdn, table);

//     res.status(200).json({
//       error: false,
//       message: "SMS Queued Successfully.",
//     });
//   } catch (error) {
//     res.json({ error: true, message: error.message });
//   }
// };

// export const uploadNumbers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { table, numbers } = req.body;

//     if (!table || !numbers || !numbers.length) {
//       throwError(MISSING_PARAMETER);
//     }

//     const selectedTable: any = prisma[table];
//     const formattedData = numbers
//       .filter((msisdn: any) => msisdn.trim() !== "")
//       .map((msisdn: any) => ({ msisdn: msisdn.trim(), status: 0 }));

//     const uploadPromises = formattedData.map(async (data: any) => {
//       try {
//         await selectedTable.createMany({
//           data,
//         });
//       } catch (error) {
//         // console.error("Error creating record:", error.message);
//         if (error.code === "P2002" && error.meta?.target?.includes("msisdn")) {
//           console.error("Duplicate msisdn:", data.msisdn);
//         } else {
//           throw error;
//         }
//       }
//     });

//     await Promise.all(uploadPromises);

//     res.status(200).json({
//       error: false,
//       message: "Numbers uploaded Successfully.",
//     });
//   } catch (error) {
//     res.json({ error: true, message: error.message });
//   }
// };
