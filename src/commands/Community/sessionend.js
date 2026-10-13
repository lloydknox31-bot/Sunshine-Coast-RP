
import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} from 'discord.js';

const SESSIONS_CHANNEL_ID = '1558799565774258206';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('sessionend')
    .setDescription('End the current Sunshine Coast Roleplay session.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ Only Administrators can end sessions.',
        flags: 64
      });
    }

    await interaction.deferReply({ flags: 64 });

    try {
      const channel = await interaction.client.channels.fetch(
        SESSIONS_CHANNEL_ID
      );

      if (!channel?.isTextBased()) {
        return interaction.editReply({
          content: '❌ Sessions channel could not be found.'
        });
      }

      // Find the most recent startup announcement from this bot.
      const messages = await channel.messages.fetch({ limit: 100 });

      const startupMessage = messages.find(message =>
        message.author.id === interaction.client.user.id &&
        message.embeds.some(embed =>
          embed.title?.includes('Sunshine Coast Roleplay | Session Startup')
        )
      );

      if (startupMessage) {
        await startupMessage.delete();
      }
const bannerEmbed = new EmbedBuilder()
  .setColor(0x168BFF)
  .setImage('https://cdn.discordapp.com/attachments/1559177088043327509/1559515316273283112/Sunshine_Coast_Roleplay_Session_Ended.png?ex=6acf5b51&is=6ace09d1&hm=1e2c6c1e86d974ed25637fd4f4e668a2b7598caf51fc11e4249f235e44758eeb&');
      const endEmbed = new EmbedBuilder()
        .setColor(0x168BFF)
        .setTitle('🛑 Sunshine Coast Roleplay | Session Ended')
        .setDescription(
          '**The Sunshine Coast Roleplay session has officially ended.**\n\n' +
          `**Ended By:** <@${interaction.user.id}>\n` +
          `**Ended:** <t:${Math.floor(Date.now() / 1000)}:R>\n\n` +
          'Thank you to everyone who participated in today’s session!\n\n' +
          'Please keep an eye on this channel for our next session vote.\n\n' +
          '**We hope to see you again soon! 💙**'
        )
        .setFooter({
          text: 'Sunshine Coast Roleplay • Session Management'
        })
        .setTimestamp();

      await channel.send({
        content: '@everyone',
       embeds: [bannerEmbed, endEmbed],
        allowedMentions: {
          parse: ['everyone']
        }
      });

      await interaction.editReply({
        content: `✅ Session ended successfully in ${channel}.`
      });

    } catch (error) {
      console.error('Session end error:', error);

      await interaction.editReply({
        content: '❌ Failed to end the session.'
      });
    }
  }
};
