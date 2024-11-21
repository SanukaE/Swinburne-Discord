import {
  Message,
  ActionRowBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
  Guild,
} from 'discord.js';
import unitsMenuBar from '../components/unitsMenuBar.js';
import getButton from '../components/getButton.js';
import getEmbed from './getEmbed.js';

export default async function postSelectionMsg(
  guild?: Guild,
  message?: Message
) {
  try {
    const menuRow = new ActionRowBuilder<MessageActionRowComponentBuilder>({
      components: [await unitsMenuBar()],
    });

    const buttonRow = new ActionRowBuilder<MessageActionRowComponentBuilder>({
      components: [
        getButton('requestBtn', 'Request Unit', ButtonStyle.Success, '📝'),
      ],
    });

    const embed = getEmbed('SELECTION');

    if (message) {
      try {
        await message.edit({
          embeds: [embed],
          components: [menuRow, buttonRow],
        });
      } catch (editError) {
        console.error('Error editing message:', editError);
      }
    } else {
      const channel = await guild?.channels.fetch(
        process.env.SELECTION_CHANNEL as string
      );

      if (!channel || !channel.isSendable())
        throw new Error('Channel not found OR no permission to send message.');

      const message = await channel.send({
        embeds: [embed],
        components: [menuRow, buttonRow],
      });

      return message;
    }
  } catch (error) {
    console.log(error || 'Failed to post selection message.');
  }
}
