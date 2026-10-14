import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} from 'discord.js';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('dashboard')
 .setDescription('Post a Sunshine Coast Roleplay dashboard')
.addStringOption(option =>
  option
    .setName('type')
    .setDescription('Choose which dashboard to post')
    .setRequired(false)
    .addChoices(
      { name: 'Welcome Dashboard', value: 'welcome' },
      { name: 'Assistance Dashboard', value: 'assistance' }
    )
),
  

  async execute(interaction) {
    const dashboardType =
  interaction.options.getString('type') || 'welcome';

if (dashboardType === 'assistance') {
  const supportChannelId = '1558666954707837020';

  const supportChannel = await interaction.client.channels.fetch(
    supportChannelId
  );

  if (!supportChannel?.isTextBased() || !supportChannel.send) {
    return interaction.reply({
      content: '❌ Assistance channel not found.',
      flags: 64
    });
  }

  const banner = new EmbedBuilder()
    .setColor(0x245BFF)
    .setImage(
      'https://cdn.discordapp.com/attachments/1559177088043327509/1559860215543898182/Sunshine_Coast_Roleplay_Assistance.png?ex=6ad09c88&is=6acf4b08&hm=4e7e21c56accc5787287b5ea3bd8bf605b2ff08abbfb57788555cb5a6b40e279'
    );

  const assistance = new EmbedBuilder()
    .setColor(0x245BFF)
    .setDescription(
      'Welcome to the **Sunshine Coast Roleplay Assistance Centre**.\n\n' +
      'Please be advised that submitting tickets for trivial matters ' +
      'or enquiries already addressed in our FAQs may result in ' +
      'moderation action.\n\n' +

      '━━━━━━━━━━━━━━━━━━━━\n\n' +

      '☎️ **GENERAL SUPPORT**\n' +
      '• General Enquiries\n' +
      '• Member Reports\n' +
      '• Partnerships\n\n' +

      '━━━━━━━━━━━━━━━━━━━━\n\n' +

      '⚖️ **INTERNAL AFFAIRS**\n' +
      '• Staff Reports\n' +
      '• Staff Conduct Concerns\n' +
      '• Staff Rewards\n\n' +

      '━━━━━━━━━━━━━━━━━━━━\n\n' +

      '🚔 **DEPARTMENT SUPPORT**\n' +
      '• Mafia Reports\n' +
      '• Department Reports\n' +
      '• Department Enquiries\n\n' +

      '━━━━━━━━━━━━━━━━━━━━\n\n' +

      '🎫 **OPENING A TICKET**\n' +
      'Please use the **Tickets V2 dropdown below** to select ' +
      'the appropriate support department.'
    )
    .setFooter({
      text: 'Sunshine Coast Roleplay • Official Assistance Centre'
    });

  await supportChannel.send({
    embeds: [banner, assistance]
  });

  return interaction.reply({
    content: `✅ Assistance Dashboard posted in ${supportChannel}!`,
    flags: 64
  });
}
    const embed = new EmbedBuilder()
      .setColor(0x245BFF)
      .setTitle('🌊 Sunshine Coast Roleplay | Dashboard')
     .setDescription(
  '**🌴 Welcome to Sunshine Coast Roleplay!**\n\n' +
  'Welcome to Sunshine Coast Roleplay, an Australian ER:LC roleplay community founded by SWAMPSNAKE749 on the 11th of October 2026.\n\n' +
  '🚨 **What We Offer**\n' +
  '• Realistic Australian roleplay\n' +
  '• Emergency services departments\n' +
  '• Organised roleplay sessions\n\n' +
'📋 Use the dropdown menu below to explore our server!' +
'\n\n' +
        '🔗 **IMPORTANT LINKS**\n' +
        '[Staff Application](https://melonly.xyz/dashboard/7514863869194407936/applications/7515395088436957184)\n' +
        '[Department Applications](https://example.com)\n' +
        '[Ban Appeals](https://example.com)\n' +
        '[Roblox Group](https://www.roblox.com/communities/15251556/Sunshine-Coast-Roleplay-ERLC#!/about)\n\n' +
'💻 **IMPORTANT CHANNELS**\n' +
'📢 Announcements: <#1558667696030089217>\n' +
'🚨 Server Updates: <#1558667358430564434>\n' +
'🎮 Sessions: <#1558799565774258206>\n' +
'🚔 Departments: <#1558667783988846694>\n' +
'🎫 Support: <#1558666954707837020>'

      )
.setImage('https://cdn.discordapp.com/attachments/1559177088043327509/1559177151595544648/Sunshine_Coast_Roleplay_Dashboard_1.png?ex=6ace2061&is=6acccee1&hm=ff30b4f5d9d296b571ca0e90ddf8bcf1bcbb27595d4bbeac9b96e825ba9dba9f&')
.setFooter({
  text: 'Sunshine Coast Roleplay • Australian Roleplay'
      })
      .setTimestamp();

    const menu = new StringSelectMenuBuilder()
      .setCustomId('scrp_dashboard_menu')
      .setPlaceholder('Choose a dashboard page...')
      .addOptions(
        {
          label: 'Dashboard',
          description: 'Return to the welcome page',
          value: 'dashboard',
          emoji: '🏠'
        },
        {
          label: 'Server Rules',
          description: 'View our community rules',
          value: 'rules',
          emoji: '📜'
        },
        {
          label: 'Departments',
          description: 'Explore our departments',
          value: 'departments',
          emoji: '🚔'
        },
        {
          label: 'Applications',
          description: 'Find application links',
          value: 'applications',
          emoji: '📝'
        }
      );

    const row = new ActionRowBuilder()
      .addComponents(menu);

 await interaction.channel.send({
  embeds: [embed],
  components: [row]
});

await interaction.reply({
  content: '✅ Dashboard posted successfully!',
  flags: 64
});
  }
};
// Sunshine Coast Roleplay Dashboard
