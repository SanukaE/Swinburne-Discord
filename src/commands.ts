import { SlashCommandBuilder, Routes, REST } from 'discord.js';
import 'dotenv/config';

const deleteUnitCommand = new SlashCommandBuilder();

deleteUnitCommand.setName('remove-unit');
deleteUnitCommand.setDescription('Removes a registered unit from the server.');

deleteUnitCommand.addStringOption((option) =>
  option
    .setName('code')
    .setDescription('The code of the unit you want to remove.')
    .setRequired(true)
);

async function registerCommands() {
  const appID = process.env.APP_ID;
  const guildID = process.env.GUILD_ID;
  const appToken = process.env.APP_TOKEN;

  try {
    if (!appID || !guildID || !appToken)
      throw new Error('Missing environment variable(s).');

    const rest = new REST({ version: '10' }).setToken(appToken);

    await rest.put(Routes.applicationGuildCommands(appID, guildID), {
      body: [deleteUnitCommand.toJSON()],
    });
  } catch (error) {
    console.log(error || 'Error while registering commands.');
  }
}

registerCommands();
