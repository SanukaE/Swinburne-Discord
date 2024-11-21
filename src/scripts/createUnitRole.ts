import { Guild } from 'discord.js';

export default async function createUnitRole(guild: Guild, unitCode: string) {
  try {
    const role = await guild.roles.create({
      color: 'Random',
      mentionable: false,
      name: unitCode,
    });

    return role.id;
  } catch (error) {
    console.log(error || 'Failed creating a role for the unit.');
  }
}
