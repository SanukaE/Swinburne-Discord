import { Guild } from 'discord.js';

export default async function deleteUnitRole(guild: Guild, roleID: string) {
  try {
    await guild.roles.cache.find((role) => role.id === roleID)?.delete();
  } catch (error) {
    console.log(error || 'Error while deleting unit role.');
  }
}
