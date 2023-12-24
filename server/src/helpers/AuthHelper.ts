import { verify, VerifyErrors } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const validateInput = (...params: any[]): boolean => {
  let hasError: boolean = false;
  params.forEach((item: any) => {
    if (item === undefined || item === null || !item.length) {
      hasError = true;
      return;
    }
  });
  return hasError;
};

export const hashPassword = (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
};

export const verifyJwtToken = (token: string): Promise<any | VerifyErrors> => {
  return new Promise((resolve, reject) => {
    verify(
      token,
      process.env.JWT_SECRET,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          if (decoded) {
            resolve(decoded);
          } else {
            reject(new Error("Decoded token is missing."));
          }
        }
      }
    );
  });
};
