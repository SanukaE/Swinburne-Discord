import { Guild, ChannelType, PermissionFlagsBits } from 'discord.js';
import 'dotenv/config';

export default async function createChannels(
  guild: Guild,
  unitCode: string,
  roleID: string
) {
  const channelNames = ['chat', 'resources', 'support'];

  try {
    const everyoneRole = guild.roles.cache.find(
      (role) => role.name === '@everyone'
    );
    const appID = process.env.APP_ID as string;

    if (!everyoneRole) {
      console.error('Cannot find @everyone role');
      return null;
    }

    const category = await guild.channels.create({
      name: unitCode,
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: everyoneRole.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        { id: roleID, allow: [PermissionFlagsBits.ViewChannel] },
        { id: appID, allow: [PermissionFlagsBits.ViewChannel] },
      ],
    });

    for (const channelName of channelNames) {
      await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: category.id,
      });
    }

    return category.id;
  } catch (error) {
    console.log(error || 'Failed creating category/channel(s).');
  }
}
