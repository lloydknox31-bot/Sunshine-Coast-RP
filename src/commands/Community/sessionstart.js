
import {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} from 'discord.js';

const SESSIONS_CHANNEL_ID = '1558799565774258206';

// Paste the same direct image URL used in sessionVote.js.
const BANNER_URL = 'https://cdn.discordapp.com/attachments/1559177088043327509/1559511569426284674/Sunshine_Coast_Roleplay_Session_Startup.png?ex=6acf57d4&is=6ace0654&hm=e4d096062ea15ad419ab509c9779d72fcbb01ec6ac4b83800a356d8d901cec79&';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('sessionstart')
    .setDescription('Manually start a Sunshine Coast Roleplay session.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ Only Administrators can start sessions.',
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

      const startupEmbed = new EmbedBuilder()
        .setColor(0x168BFF)
        .setTitle('🚨 Sunshine Coast Roleplay | Session Startup')
        .setDescription(
          '**Our roleplay session is now starting!**\n\n' +
          '**Server:** Sunshine Coast Roleplay\n' +
          '**Server Code:** `ssc`\n' +
          `**Host:** <@${interaction.user.id}>\n` +
          `**Started:** <t:${Math.floor(Date.now() / 1000)}:R>\n\n` +
          'Please read our rules before joining.\n\n' +
          '⚠️ **IMPORTANT NOTICE**\n' +
          'If you voted, you must join the session within **15 minutes** ' +
          'or face moderation action.\n\n' +
          '**Have a great RP!**'
        )
        .setFooter({
          text: 'Sunshine Coast Roleplay • Session Management'
        })
        .setTimestamp();

      await channel.send({
        content: '@everyone',
        embeds: [bannerEmbed, startupEmbed],
        allowedMentions: {
          parse: ['everyone']
        }
      });

      await interaction.editReply({
        content: `✅ Session Startup posted successfully in ${channel}.`
      });

    } catch (error) {
      console.error('Manual session startup error:', error);

      await interaction.editReply({
        content: '❌ Failed to post the Session Startup announcement.'
      });
    }
  }
};

