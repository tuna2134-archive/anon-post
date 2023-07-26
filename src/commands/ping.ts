import { CommandInteraction } from "discord.js";

export const commandData = {
  name: "ping",
  description: "botの速度",
};

export default async function handleInteraction(
  interaction: CommandInteraction,
) {
  await interaction.reply({
    content: `${interaction.client.ws.ping}ms`,
  });
}
