
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} from 'discord.js';

const SESSIONS_CHANNEL_ID = '1558799565774258206';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('sessionvote')
    .setDescription('Start a Sunshine Coast Roleplay session vote.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ Only Administrators can start session votes.',
        flags: 64
      });
    }

    await interaction.deferReply({ flags: 64 });

    try {
      const channel = await interaction.client.channels.fetch(
        SESSIONS_CHANNEL_ID
      );

      if (!channel || !channel.isTextBased()) {
        return interaction.editReply({
          content: '❌ Sessions channel could not be found.'
        });
      }

      const embed = new EmbedBuilder()
        .setColor(0x168BFF)
        .setTitle('🗳️ Sunshine Coast Roleplay | Session Vote')
        .setDescription(
          '**A new roleplay session has been proposed!**\n\n' +
          'Would you like a session to commence?\n\n' +
          `**Session Host:** ${interaction.user}\n` +
          '**Required YES Votes:** 15\n' +
          '**Status:** 🟢 Voting Open\n\n' +
          '**YES Votes:** 0 / 15\n' +
          '**NO Votes:** 0\n\n' +
          '*Please cast your vote below.*'
        )
        .setFooter({
          text: 'Sunshine Coast Roleplay • Session Management'
        })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('session_vote_yes')
          .setLabel('Yes · 0')
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('session_vote_no')
          .setLabel('No · 0')
          .setStyle(ButtonStyle.Danger)
      );

    await channel.send({
  content: '@everyone',
  embeds: [embed],
  components: [row],
  allowedMentions: {
    parse: ['everyone']
  }
});

      await interaction.editReply({
        content: `✅ Session vote posted successfully in ${channel}.`
      });

    } catch (error) {
      console.error('Session vote error:', error);

      await interaction.editReply({
        content: '❌ Failed to post the session vote.'
      });
    }
  }
};
