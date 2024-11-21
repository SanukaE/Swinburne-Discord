import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import Unit from '../models/Unit.js';

export default async function unitsMenuBar() {
  const menu = new StringSelectMenuBuilder({
    customId: 'unitsMenu',
    placeholder: 'Select your units',
  });

  menu.addOptions(
    new StringSelectMenuOptionBuilder({
      label: 'Remove All',
      description: 'Remove all units you have selected.',
      value: 'remove',
    })
  );

  const units = await Unit.find();

  units.forEach((unit) => {
    if (unit.roleID && unit.categoryID) {
      menu.addOptions(
        new StringSelectMenuOptionBuilder({
          label: unit.code,
          value: unit.roleID,
          description: unit.name.substring(0, 100),
        })
      );
    }
  });

  return menu;
}
