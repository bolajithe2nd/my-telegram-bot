import { Context } from "telegraf";
import { start, help, quit, test } from "../controllers";

export function Commands(bot: any) {
  // "/start" command
  bot.start(start);

  // "/help" command
  bot.help(help);

  // "/order" command
  bot.command("order", start);

  // "/quit" command
  bot.command("quit", quit);

  // "/test" command
  bot.command("test", test);

  bot.on("location", (ctx: Context) => {
    const userLocation = ctx.message.location;
    ctx.reply(
      `Thank you for sharing your location: ${userLocation.latitude}, ${userLocation.longitude}`
    );
  });

  bot.on("sticker", (ctx: any) => ctx.reply("👍"));
  bot.hears("hi" || "Hey" || "Hello", (ctx: any) => ctx.reply("Hey there"));
  // bot.hears("hi", (ctx: any) => ctx.reply("Hey there"));
}
