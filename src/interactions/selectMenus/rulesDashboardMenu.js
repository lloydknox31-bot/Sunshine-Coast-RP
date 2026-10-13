
import { EmbedBuilder } from 'discord.js';

const gameRules = [
  {
    title: '01 | GENERAL RULES',
    rules: [
      '**1.01** Respect all players and staff.',
      '**1.02** No bullying, harassment or discrimination.',
      '**1.03** No exploiting, hacking or glitch abuse.',
      '**1.04** Follow reasonable staff instructions.',
      '**1.05** No trolling or disrupting roleplay.',
      '**1.06** No unauthorised advertising.'
    ]
  },
  {
    title: '02 | ROLEPLAY RULES',
    rules: [
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
    title: '03 | CIVILIAN RULES',
    rules: [
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
    title: '04 | QUEENSLAND POLICE SERVICE',
    rules: [
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
    title: '05 | FIRE & RESCUE',
    rules: [
      '**5.01** Respond realistically to incidents.',
      '**5.02** Use equipment appropriately.',
      '**5.03** Follow incident command.',
      '**5.04** Prioritise scene safety.',
      '**5.05** No fake emergency incidents.'
    ]
  },
  {
    title: '06 | QUEENSLAND AMBULANCE',
    rules: [
      '**6.01** Provide realistic medical roleplay.',
      '**6.02** Assess and treat patients properly.',
      '**6.03** Transport patients when necessary.',
      '**6.04** Maintain professionalism.',
      '**6.05** Follow scene safety procedures.'
    ]
  },
  {
    title: '07 | TRAFFIC REGULATIONS',
    rules: [
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
    title: '08 | RADIO COMMUNICATIONS',
    rules: [
      '**8.01** Maintain professional radio communications.',
      '**8.02** No radio spam.',
      '**8.03** Use assigned callsigns.',
      '**8.04** Prioritise emergency transmissions.',
      '**8.05** Keep OOC conversations off RP radios.'
    ]
  },
  {
    title: '09 | STAFF RULES',
    rules: [
      '**9.01** Follow reasonable staff directions.',
      '**9.02** No abusing staff permissions.',
      '**9.03** Report violations through Internal Affairs tickets.',
      '**9.04** Always Provide evidence when possible.',
      '**9.05** Appeals must follow server procedures.'
    ]
  },
  {
    title: '10 | PUNISHMENTS',
    rules: [
      'Verbal Warning',
      'Formal Warning',
      'Server Kick',
      'Permanent Ban',
      '',
      'Punishments depend on severity and previous offences.'
    ]
  }
];

const discordRules = [
  '**1. Respect Everyone**',
  'Treat all members and staff with respect. No harassment or discrimination.',
  '',
  '**2. No Spamming**',
  'Do not spam messages, mentions or emojis.',
  '',
  '**3. Appropriate Content**',
  'No NSFW or inappropriate content.',
  '',
  '**4. No Advertising**',
  'No advertising without staff permission.',
  '',
  '**5. Use Channels Correctly**',
  'Keep messages relevant to each channel.',
  '',
  '**6. Follow Staff Instructions**',
  'Follow reasonable instructions from staff.',
  '',
  '**7. Protect Privacy**',
  'Do not share personal information.',
  '',
  '**8. No Impersonation**',
  'Do not impersonate staff or other members.',
  '',
  '**9. Follow Discord Terms**',
  'Follow Discord Terms of Service.',
  '',
  '**10. Report Problems**',
  'Use support tickets to report violations.'
];

export default {
  name: 'scrp_rules_menu',

  async execute(interaction) {
    const selected = interaction.values[0];

    if (selected === 'discord') {
      const embed = new EmbedBuilder()
        .setColor(0x245BFF)
        .setTitle('💬 Sunshine Coast Roleplay | Discord Rules')
        .setDescription(discordRules.join('\n'))
        .setFooter({
          text: 'Sunshine Coast Roleplay • Discord Rules'
        });

      return interaction.reply({
        embeds: [embed],
        flags: 64
      });
    }

    if (selected === 'game') {
      const embeds = [];

      for (let i = 0; i < gameRules.length; i += 3) {
        const sections = gameRules.slice(i, i + 3);

        const embed = new EmbedBuilder()
          .setColor(0x245BFF)
          .setTitle(
            i === 0
              ? '🌐 Sunshine Coast Roleplay | Game Rules'
              : '📜 Game Rules | Continued'
          )
          .setDescription(
            sections.map(section =>
              `**${section.title}**\n${section.rules.join('\n')}`
            ).join('\n\n')
          )
          .setFooter({
            text: 'Sunshine Coast Roleplay • Game Rules'
          });

        embeds.push(embed);
      }

      return interaction.reply({
        embeds,
        flags: 64
      });
    }

    return interaction.reply({
      content: '❌ Unknown rules category.',
      flags: 64
    });
  }
};

