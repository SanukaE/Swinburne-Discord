import {
  Client,
  ActionRowBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
  Message,
  Guild,
  GuildMember,
} from 'discord.js';
import mongoConnect from './scripts/mongoConnect.js';
import getEmbed from './scripts/getEmbed.js';
import getButton from './components/getButton.js';
import RequestUnit from './modals/RequestUnit.js';
import 'dotenv/config';
import Unit from './models/Unit.js';
import createUnitRole from './scripts/createUnitRole.js';
import createChannels from './scripts/createChannels.js';
import deleteChannels from './scripts/deleteChannels.js';
import deleteUnitRole from './scripts/deleteUnitRole.js';
import postSelectionMsg from './scripts/postSelectionMsg.js';

const app = new Client({
  intents: [],
});

let selectionMessage: Message | undefined;
let guild: Guild;

app.on('ready', async () => {
  console.log(`Logged in as ${app.user?.tag}!`);

  await mongoConnect();
  guild = await app.guilds.fetch(process.env.GUILD_ID as string);
  await guild.roles.fetch();

  selectionMessage = await postSelectionMsg(guild);
});

app.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const customID = interaction.customId;
  let isUnitRequestAccepted = customID.startsWith('acceptRequest');

  if (customID === 'requestBtn') {
    await interaction.showModal(RequestUnit);
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  const unitCode = customID.split('-')[1];
  const userId = customID.split('-')[2];

  if (isUnitRequestAccepted) {
    await interaction.editReply(
      '<a:loading:1309151876620619840> Registering the new unit.'
    );
    const guild = await app.guilds.fetch(process.env.GUILD_ID as string);

    const roleID = await createUnitRole(guild, unitCode);

    if (roleID) {
      const categoryID = await createChannels(guild, unitCode, roleID);
      if (categoryID) {
        await Unit.findOneAndUpdate(
          { code: unitCode },
          { $set: { categoryID, roleID } }
        );
        await postSelectionMsg(undefined, selectionMessage);
        await interaction.editReply(
          '<a:success:1309151800028565504> Unit Registered!'
        );
      } else {
        await interaction.editReply(
          '<a:error:1309151843552596038> Internal Error: Please contact ItzSanuka.'
        );
      }
    } else {
      await interaction.editReply(
        '<a:error:1309151843552596038> Internal Error: Please contact ItzSanuka.'
      );
    }
  } else {
    await interaction.editReply(
      '<a:success:1309151800028565504> Request Declined.'
    );
    await Unit.findOneAndDelete({ code: unitCode });
  }

  await interaction.message.delete();

  try {
    const user = await app.users.fetch(userId);
    const result = isUnitRequestAccepted ? 'accepted' : 'declined';
    await user.send(
      `Hello, your unit request for \`${unitCode}\` was ${result}.`
    );
  } catch (error) {
    console.log(error || 'Error while DMing user.');
  }
});

app.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  await interaction.deferReply({ ephemeral: true });

  const unitDetails = {
    code: interaction.fields
      .getTextInputValue('unitCodeInput')
      .trim()
      .toLocaleUpperCase(),
    name: interaction.fields.getTextInputValue('unitNameInput').trim(),
  };

  const registeredUnit = await Unit.findOne({ code: unitDetails.code });

  if (registeredUnit?.code === unitDetails.code) {
    await interaction.editReply(
      `<a:error:1309151843552596038> Unit \`${unitDetails.code}\` has already been registered/requested.`
    );
    return;
  }

  const embedMessage = getEmbed('REQUEST', unitDetails);

  const actionButtons = new ActionRowBuilder<MessageActionRowComponentBuilder>({
    components: [
      getButton(
        `acceptRequest-${unitDetails.code}-${interaction.user.id}`,
        'Accept Request',
        ButtonStyle.Success,
        '✅'
      ),
      getButton(
        `declineRequest-${unitDetails.code}-${interaction.user.id}`,
        'Decline Request',
        ButtonStyle.Danger,
        '❌'
      ),
    ],
  });

  app.channels
    .fetch(process.env.REQUEST_CHANNEL as string)
    .then((channel) => {
      if (!channel || !channel.isSendable())
        throw new Error('Channel not found OR no permission to send message.');

      channel.send({ embeds: [embedMessage], components: [actionButtons] });
      interaction.editReply('<a:success:1309151800028565504> Request Sent!');
    })
    .catch((error) => {
      interaction.editReply(error || 'Failed to send request.');
    });

  Unit.create(unitDetails);
});

app.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  await interaction.deferReply({ ephemeral: true });

  const appOwnerID = process.env.APP_OWNER_ID;
  const guildOwnerID = process.env.GUILD_OWNER_ID;

  const member = interaction.member as GuildMember;
  if (member.id !== appOwnerID && member.id !== guildOwnerID) {
    await interaction.editReply(
      '<a:error:1309151843552596038> You do not have the right permission to perform this command.'
    );
    return;
  }

  const unitCode = (interaction.options as any)
    .getString('code', true)
    .trim()
    .toUpperCase();
  const unit = await Unit.findOneAndDelete({ code: unitCode });

  if (unit && unit.categoryID && unit.roleID) {
    await deleteChannels(guild, unit.categoryID);
    await deleteUnitRole(guild, unit.roleID);
    await postSelectionMsg(undefined, selectionMessage);
    await interaction.editReply(
      `<a:success:1309151800028565504> Unit \`${unitCode}\` has been removed from the server.`
    );
  } else {
    await interaction.editReply(
      `<a:error:1309151843552596038> Unit \`${unitCode}\` does not exist OR the unit hasn't been registered yet.`
    );
  }
});

app.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  await interaction.deferReply({ ephemeral: true });

  const unitRoleID = interaction.values[0];
  const member = interaction.member as GuildMember;

  if (unitRoleID === 'remove') {
    const units = await Unit.find();

    units.forEach(async (unit) => {
      if (unit.roleID && unit.categoryID) {
        await member.roles.remove(unit.roleID);
      }
    });

    await interaction.editReply(
      '<a:success:1309151800028565504> All unit roles have been removed from your account.'
    );
    return;
  }

  if (!member.roles.cache.has(unitRoleID)) {
    await member.roles.add(unitRoleID);
    await interaction.editReply(
      `<a:success:1309151800028565504> Role <@&${unitRoleID}> has been added to your account.`
    );
  } else {
    await member.roles.remove(unitRoleID);
    await interaction.editReply(
      `<a:success:1309151800028565504> Role <@&${unitRoleID}> has been removed from your account.`
    );
  }
});

app.login(process.env.APP_TOKEN);

const handleShutDown = async () => {
  await selectionMessage?.delete();
  await app.destroy();

  console.log('Goodbye!');
};

process.on('SIGINT', handleShutDown);
process.on('SIGTERM', handleShutDown);
