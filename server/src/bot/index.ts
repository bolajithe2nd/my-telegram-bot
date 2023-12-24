// Importing necessary modules and utilities
import Telegraf, { Context, session } from "telegraf";
import { responseTimeMiddleware } from "./middlewares";
import { Commands } from "./Commands";

function setupBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.use(async (ctx: Context, next: () => Promise<void>) => {
    try {
      await responseTimeMiddleware(ctx, next);
    } catch (error) {
      console.error("Error in responseTimeMiddleware:", error);
      ctx.reply("Oops! Something went wrong.");
    }
  });

  bot.use(session());

  bot.catch((err: Error, ctx: Context) => {
    console.error(`Error in ${ctx.updateType}:`, err);
    ctx.reply("Oops! Something went wrong.");
  });

  // Bot commands
  Commands(bot);

  // Launch bot
  bot.launch();
}

export default setupBot;
