import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default function getButton(
  customId: string,
  label: string,
  style: ButtonStyle,
  emoji: string
) {
  const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel(label)
    .setStyle(style)
    .setEmoji(emoji);

  return button;
}
