
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  MessageFlags
} = require('discord.js');

const SESSIONS_CHANNEL_ID = '1558799565774258206';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sessionvote')
    .setDescription('Start a Sunshine Coast Roleplay session vote.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ This command is restricted to Administrators.',
        flags: MessageFlags.Ephemeral
      });
    }

    const channel = await interaction.client.channels.fetch(SESSIONS_CHANNEL_ID);

    if (!channel?.isTextBased()) {
      return interaction.reply({
        content: '❌ The sessions channel could not be found.',
        flags: MessageFlags.Ephemeral
      });
    }

    const embed = new EmbedBuilder()
      .setColor('#168BFF')
      .setTitle('🗳️ Session Startup Vote')
      .setDescription(
        'A Sunshine Coast Roleplay session has been proposed.\n\n' +
        'Would you like a session to commence?\n\n' +
        `**Session Host:** ${interaction.user}\n` +
        '**Required Votes:** 15 YES votes\n' +
        '**Status:** 🟢 Voting Open\n\n' +
        '**Yes:** 0 / 15\n' +
        '**No:** 0\n\n' +
        'Please cast your vote using the buttons below.'
      )
      .setFooter({ text: 'Sunshine Coast Roleplay • Session Management' })
      .setTimestamp();

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('session_vote_yes')
        .setLabel('Yes • 0')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('session_vote_no')
        .setLabel('No • 0')
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({
      embeds: [embed],
      components: [buttons]
    });

    await interaction.reply({
      content: `✅ Session vote posted in ${channel}.`,
      flags: MessageFlags.Ephemeral
    });
  }
};

