import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

function getInputActionRow(name: string, exampleText: string) {
  const input = new TextInputBuilder({
    customId: `unit${name}Input`,
    label: `Unit ${name}:`,
    placeholder: `Eg: ${exampleText}`,
    required: true,
    style: TextInputStyle.Short,
  });

  const actionRow = new ActionRowBuilder<TextInputBuilder>({
    components: [input],
  });

  return actionRow;
}

const modal = new ModalBuilder({
  customId: 'requestUnitModal',
  title: 'Request a Unit',
  components: [
    getInputActionRow('Code', 'COS10029'),
    getInputActionRow('Name', 'Fundamentals of Programming'),
  ],
});

export default modal;
