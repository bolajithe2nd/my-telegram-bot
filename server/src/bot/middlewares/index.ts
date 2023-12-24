import { Context } from "telegraf";

export const responseTimeMiddleware = async (ctx: Context, next: any) => {
  await next();
  const start: Date = new Date();
  const startTimestamp: number = start.getTime();
  const ms: number = new Date().getTime() - startTimestamp;
  console.log("Response time: %sms", ms);
};
