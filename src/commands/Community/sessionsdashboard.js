
import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} from 'discord.js';

const SESSIONS_CHANNEL_ID = '1558799565774258206';

// Replace this with the direct Discord image link.
const BANNER_URL = 'https://cdn.discordapp.com/attachments/1559177088043327509/1559519057584062484/Sunshine_Coast_Session_Hours_Banner.png?ex=6acf5ecd&is=6ace0d4d&hm=977fc4cd6d74f99a11ee26016f4b4e0fb7db90b3c3b00dd26547383481eae556&';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('sessionsdashboard')
    .setDescription('Post the Sunshine Coast Roleplay sessions dashboard.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ Only Administrators can post this dashboard.',
        flags: 64
      });
    }

    await interaction.deferReply({ flags: 64 });

    try {
      const channel = await interaction.client.channels.fetch(
        SESSIONS_CHANNEL_ID
      );

      if (!channel?.isTextBased() || !channel.send) {
        return interaction.editReply({
          content: '❌ Sessions channel could not be found.'
        });
      }

      const bannerEmbed = new EmbedBuilder()
        .setColor(0x168BFF)
        .setImage(BANNER_URL);

      const infoEmbed = new EmbedBuilder()
        .setColor(0x168BFF)
        .setDescription(
          '**Welcome to Sunshine Coast Roleplay Sessions!**\n\n' +
          'You will receive a notification when our staff team ' +
          'commences a session vote or session startup. ' +
          'Please refrain from attempting to join an inactive server.\n\n' +

          '📅 **SERVER SCHEDULE**\n\n' +
          'Our staff team follows an approximate weekly schedule:\n\n' +
          '• **Monday – Friday:** 5:00 PM – 8:00 PM\n' +
          '• **Saturday:** 12:00 PM – 3:00/4:00 PM\n' +
          '• **Sunday:** 2:00 PM – 4:00 PM\n\n' +
          '*All times are Queensland time (AEST). ' +
          'Session times may vary during public and school holidays.*\n\n' +

          '📋 **SESSION REGULATIONS**\n\n' +
          '• All members must follow the server rules.\n' +
          '• Respect staff and follow their instructions.\n' +
          '• Maintain realistic and professional roleplay.\n' +
          '• Do not join the private server unless a session is active.\n' +
          '• Members who vote YES must join within **15 minutes** ' +
          'of session startup or may face moderation action.\n\n' +

          '🚨 **SESSION INFORMATION**\n\n' +
          '**Server:** Sunshine Coast Roleplay\n' +
          '**ER:LC Server Code:** `ssc`\n' +
          '**Session Vote Requirement:** 15 YES votes\n\n' +
          '*Thank you for being part of Sunshine Coast Roleplay!*'
        )
        .setFooter({
          text: 'Sunshine Coast Roleplay • Session Information'
        });

      await channel.send({
        embeds: [bannerEmbed, infoEmbed]
      });

      await interaction.editReply({
        content: `✅ Sessions Dashboard posted in ${channel}.`
      });

    } catch (error) {
      console.error('Sessions dashboard error:', error);

      await interaction.editReply({
        content: '❌ Failed to post the Sessions Dashboard.'
      });
    }
  }
};
