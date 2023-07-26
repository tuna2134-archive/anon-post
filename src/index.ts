import {
  Client,
  GatewayIntentBits,
  Events,
  ApplicationCommandDataResolvable,
} from "discord.js";
import { Logger } from "tslog";
import { promises as fs } from "fs";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const logger = new Logger({
  name: "bot",
});

client.on(Events.ClientReady, async (c) => {
  logger.info(`${c.user.username} was ready`);
  const files = await fs.readdir("./commands");
  let commands: ApplicationCommandDataResolvable[] = [];
  files.forEach(async (file) => {
    const { commandData } = await import(file);
    commands.push(commandData);
  });
  await c.application.commands.set(commands);
});

client.login(process.env.DISCORD_TOKEN);
