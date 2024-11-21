import { Guild, ChannelType } from 'discord.js';

export default async function deleteChannels(guild: Guild, categoryID: string) {
  try {
    const category = await guild.channels.fetch(categoryID);

    if (!category || category.type !== ChannelType.GuildCategory)
      throw new Error('Category not found or is not a valid category.');

    const channels = Array.from(category.children.cache.values());

    channels.forEach(async (channel) => {
      try {
        await channel.delete();
      } catch (channelDeleteError) {
        console.log(
          `Failed to delete channel ${channel.name}: ${channelDeleteError}`
        );
      }
    });

    await category.delete();
  } catch (error) {
    console.error('Error in channel deletion process:', error);
  }
}
