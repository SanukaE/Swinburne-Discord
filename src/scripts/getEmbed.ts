import { EmbedBuilder } from 'discord.js';

type UnitDetailsType = {
  code: string;
  name: string;
};

export default function getEmbed(type: string, unitDetails?: UnitDetailsType) {
  const fields =
    type === 'SELECTION'
      ? [
          {
            name: 'Student Login',
            value: 'https://swinburne.edu.au/student-login',
          },
          { name: 'Canvas Login', value: 'https://swinburne.instructure.com' },
        ]
      : [
          {
            name: 'Courses',
            value: 'https://swinburne.edu.au/courses/find-a-course',
          },
        ];

  const title = type === 'SELECTION' ? 'Select your units' : 'New Unit Request';

  const description =
    type === 'SELECTION'
      ? 'Use the bar bellow to pick the units you are currently enrolled in. Can\'t find your unit? Then request it by clicking on "Request Unit" button.'
      : `A user has requested to add the bellow unit to the server.\`\`\`\nCode: ${unitDetails?.code}\nName: ${unitDetails?.name}\`\`\``;

  const embed = new EmbedBuilder({
    color: 0x0099ff,
    footer: {
      text: 'Made with ❤️ by ItzSanuka',
      icon_url: 'https://i.postimg.cc/htzSdpnj/current-pfp.jpg',
    },
    fields,
    thumbnail: { url: 'https://i.postimg.cc/1zcRBgPP/Swinburne-Logo.jpg' },
    title,
    description,
  });

  return embed;
}
