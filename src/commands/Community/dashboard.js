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
   .setDescription('Sunshine Coast Roleplay dashboard'),

  async execute(interaction) {
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
