
import { EmbedBuilder } from 'discord.js';

export default {
  name: 'scrp_dashboard_menu',


async execute(interaction) {
  await interaction.deferUpdate();

  const selected = interaction.values[0];


    const embed = new EmbedBuilder()
      .setColor(0x245BFF)
      .setFooter({
        text: 'Sunshine Coast Roleplay • Australian Roleplay'
      });

    switch (selected) {
      case 'dashboard':
        embed
          .setTitle('🌊 Sunshine Coast Roleplay | Dashboard')
         
.setDescription(
  '**Welcome to Sunshine Coast Roleplay!**\n' +
  'Your home for Australian emergency services roleplay in ER:LC.\n\n' +
  '🔗 **IMPORTANT LINKS**\n' +
  '[Staff Application](https://example.com)\n' +
  '[Department Applications](https://example.com)\n' +
  '[Ban Appeals](https://example.com)\n' +
  '[Roblox Group](https://www.roblox.com/)\n\n' +
  '💻 **IMPORTANT CHANNELS**\n' +
  '📢 Announcements: <#1558667696030089217>\n' +
  '🚨 Server Updates: <#1558667358430564434>\n' +
  '🎮 Sessions: <#1558799565774258206>\n' +
  '🚔 Departments: <#1558667839888466944>\n' +
  '🎫 Support: <#1558666954707837020>'
)

          );
        break;

      case 'rules':
        embed
         

const rules = [
  {
    title: '📋 01 | GENERAL RULES',
    text: [
      '**1.01** Respect all players and staff.',
      '**1.02** No bullying, harassment or discrimination.',
      '**1.03** No exploiting, hacking or glitch abuse.',
      '**1.04** Follow reasonable staff instructions.',
      '**1.05** No trolling or disrupting roleplay.',
      '**1.06** No unauthorised advertising.'
    ]
  },
  {
    title: '🎭 02 | ROLEPLAY RULES',
    text: [
      '**2.01 | FRP:** No unrealistic roleplay.',
      '**2.02 | RDM:** No random killing.',
      '**2.03 | VDM:** No random vehicle attacks.',
      '**2.04 | NLR:** Do not return to a death scene for 10 minutes.',
      '**2.05 | FearRP:** Value your character’s life.',
      '**2.06 | Metagaming:** No using OOC information in RP.',
      '**2.07 | Powergaming:** No forcing unrealistic outcomes.',
      '**2.08 | Combat Logging:** No leaving to avoid consequences.',
      '**2.09 | Cop Baiting:** No provoking police for chases.'
    ]
  },
  {
    title: '🚗 03 | CIVILIAN RULES',
    text: [
      '**3.01** Follow Queensland-inspired road rules.',
      '**3.02** Drive realistically.',
      '**3.03** Crimes require valid roleplay reasons.',
      '**3.04** Roleplay vehicle accidents.',
      '**3.05** Give way to emergency vehicles when safe.',
      '**3.06** No random mass shootings.',
      '**3.07** No unrealistic pursuits.',
      '**3.08** Major hostage scenes require staff approval.'
    ]
  },
  {
    title: '🚓 04 | QUEENSLAND POLICE SERVICE',
    text: [
      '**4.01** Maintain professionalism.',
      '**4.02** Traffic stops require valid reasons.',
      '**4.03** Arrests require reasonable grounds.',
      '**4.04** Use proportionate force.',
      '**4.05** No unnecessary firearm usage.',
      '**4.06** Conduct realistic pursuits.',
      '**4.07** No abusing police equipment.',
      '**4.08** Follow the chain of command.',
      '**4.09** Only authorised officers may join QPS.'
    ]
  },
  {
    title: '🚒 05 | FIRE & RESCUE',
    text: [
      '**5.01** Respond realistically to incidents.',
      '**5.02** Use equipment appropriately.',
      '**5.03** Follow incident command.',
      '**5.04** Prioritise scene safety.',
      '**5.05** No fake emergency incidents.'
    ]
  },
  {
    title: '🚑 06 | QUEENSLAND AMBULANCE',
    text: [
      '**6.01** Provide realistic medical roleplay.',
      '**6.02** Assess and treat patients properly.',
      '**6.03** Transport patients when necessary.',
      '**6.04** Maintain professionalism.',
      '**6.05** Follow scene safety procedures.'
    ]
  },
  {
    title: '🚦 07 | TRAFFIC REGULATIONS',
    text: [
      '**7.01** Drive on the left side of the road.',
      '**7.02** Built-up areas: 50 km/h.',
      '**7.03** School zones: 40 km/h when active.',
      '**7.04** Major roads: 80 km/h unless signed.',
      '**7.05** Motorways: 100 km/h unless signed.',
      '**7.06** Obey traffic lights and road signs.',
      '**7.07** No unrealistic or reckless driving.'
    ]
  },
  {
    title: '📻 08 | RADIO COMMUNICATIONS',
    text: [
      '**8.01** Maintain professional radio communications.',
      '**8.02** No radio spam.',
      '**8.03** Use assigned callsigns.',
      '**8.04** Prioritise emergency transmissions.',
      '**8.05** Keep OOC conversations off RP radios.'
    ]
  },
  {
    title: '🛡️ 09 | STAFF RULES',
    text: [
      '**9.01** Follow reasonable staff directions.',
      '**9.02** No abusing staff permissions.',
      '**9.03** Report violations through Internal Affairs tickets.',
      '**9.04** Always Provide evidence when possible.',
      '**9.05** Appeals must follow server procedures.'
    ]
  },
  {
    title: '⚠️ 10 | PUNISHMENTS',
    text: [
      '🟡 Verbal Warning',
      '🟠 Formal Warning',
      '🔴 Server Kick',
      '🚫 Permanent Ban',
      '',
      'Punishments depend on severity and previous offences.'
    ]
  }
];

const rulesText = rules
  .map(section =>
    `**${section.title}**\n${section.text.join('\n')}`
  )
  .join('\n\n');

embed
  .setTitle('📜 Sunshine Coast Roleplay | Server Rules')
  .setDescription(rulesText.slice(0, 4096));

        break;

      case 'departments':
        embed
          .setTitle('🚔 Sunshine Coast Roleplay | Departments')
          .setDescription(
            '**AVAILABLE DEPARTMENTS**\n\n' +
            '🚓 Queensland Police force\n' +
            '🚒 Queensland Fire and Rescue\n' +
            '🚑 Queensland Road Side Assistance\n' +
            '🚗 Whitelisted\n\n' +
            'Check the department channels for more information.'
          );
        break;

      case 'applications':
        embed
          .setTitle('📝 Sunshine Coast Roleplay | Applications')
          .setDescription(
            '**APPLICATIONS**\n\n' +
            '[Staff Application](https://example.com)\n' +
            '[Whitelisted Application](https://example.com)\n' +
            '[Ban Appeals](https://example.com)'
          );
        break;


         default:
        await interaction.followUp({
          content: 'Unknown dashboard option.',
          ephemeral: true
        });
        return;
    }

    await interaction.editReply({
      embeds: [embed]
    });
  }
};
