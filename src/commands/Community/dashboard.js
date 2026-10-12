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
    .setDescription('Display the Sunshine Coast Roleplay dashboard'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x245BFF)
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
'🚔 Departments: <#1558667783988846694>\n' +
'🎫 Support: <#1558666954707837020>'

      )
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

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
// Sunshine Coast Roleplay Dashboard
