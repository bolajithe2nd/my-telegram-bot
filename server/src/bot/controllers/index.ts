import { Context } from "telegraf";

export const start = (ctx: any) => {
  const { first_name, last_name } = ctx.from;
  const name = first_name + " " + last_name;

  ctx.reply(
    `*Welcome, ${name}*! 🍟 \n\nLet's get started with your perfect lunch order. Please tap the button below to begin.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Order Food",
              web_app: {
                url: process.env.WEBAPP_LINK,
              },
            },
          ],
        ],
      },
      parse_mode: "Markdown",
    }
  );
};

export const help = (ctx: Context) => {
  ctx.reply(
    "This is the help page. You can use the following commands:\n\n" +
      "/start - Start the bot\n" +
      "/order - Order a burger\n" +
      "/quit - Quit the bot\n" +
      "/help - Show this help page"
  );
};

export const quit = (ctx: Context) => {
  ctx.telegram.leaveChat(ctx.message.chat.id);
  ctx.leaveChat();
};

export const test = (ctx: any) => {
  // ctx.replyWithQuiz("Do you feel satisfied?", ["Yes", "No"]);
  // ctx.telegram.
};
