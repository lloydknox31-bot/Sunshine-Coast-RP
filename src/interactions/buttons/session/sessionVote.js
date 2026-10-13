
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js';

const REQUIRED_VOTES = 15;

// Keeps track of each member's vote for each message.
const votesByMessage = new Map();
const startingSessions = new Set();
async function handleVote(interaction, choice) {
  await interaction.deferReply({ flags: 64 });

  const messageId = interaction.message.id;

  if (!votesByMessage.has(messageId)) {
    votesByMessage.set(messageId, new Map());
  }

  const votes = votesByMessage.get(messageId);
  const previousVote = votes.get(interaction.user.id);

  if (previousVote === choice) {
    return interaction.editReply({
      content: `You have already voted ${choice.toUpperCase()}.`
    });
  }

  votes.set(interaction.user.id, choice);

  const yesCount = [...votes.values()].filter(
    vote => vote === 'yes'
  ).length;

  const noCount = [...votes.values()].filter(
    vote => vote === 'no'
  ).length;

  const originalEmbed = interaction.message.embeds[0];

  const embed = EmbedBuilder.from(originalEmbed);

  let description = originalEmbed.description;

  description = description.replace(
    /\*\*YES Votes:\*\* \d+ \/ 15/,
    `**YES Votes:** ${yesCount} / 15`
  );

  description = description.replace(
    /\*\*NO Votes:\*\* \d+/,
    `**NO Votes:** ${noCount}`
  );

  description = description.replace(
    /\*\*Status:\*\* .*/,
    yesCount >= REQUIRED_VOTES
      ? '**Status:** ✅ Vote Target Reached'
      : '**Status:** 🟢 Voting Open'
  );

  embed.setDescription(description);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('session_vote_yes')
      .setLabel(`Yes · ${yesCount}`)
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId('session_vote_no')
      .setLabel(`No · ${noCount}`)
      .setStyle(ButtonStyle.Danger)
  );


if (yesCount >= REQUIRED_VOTES) {
  // Lock voting as soon as the target is reached.
  if (startingSessions.has(messageId)) {
    return interaction.editReply({
      content: '✅ This session is already starting.'
    });
  }

  startingSessions.add(messageId);

  const closedRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('session_vote_yes')
      .setLabel(`Yes · ${yesCount}`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(true),

    new ButtonBuilder()
      .setCustomId('session_vote_no')
      .setLabel(`No · ${noCount}`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true)
  );

  await interaction.message.edit({
    embeds: [embed],
    components: [closedRow]
  });

  await interaction.editReply({
    content: '✅ 15 YES votes reached! Session starts in 30 seconds.'
  });

  await new Promise(resolve => setTimeout(resolve, 30000));

  const channel = interaction.channel;

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
      '**Have a great RP!**'
    )
    .setFooter({
      text: 'Sunshine Coast Roleplay • Session Management'
    })
    .setTimestamp();

  await channel.send({
    content: '@everyone',
    embeds: [startupEmbed],
    allowedMentions: {
      parse: ['everyone']
    }
  });

  await interaction.message.delete();
  votesByMessage.delete(messageId);
  startingSessions.delete(messageId);
  return;
}


await interaction.message.edit({
  embeds: [embed],
  components: [row]
});
  await interaction.editReply({
    content: `✅ Your ${choice.toUpperCase()} vote has been recorded.`
  });
}

export default [
  {
    name: 'session_vote_yes',
    execute: interaction => handleVote(interaction, 'yes')
  },
  {
    name: 'session_vote_no',
    execute: interaction => handleVote(interaction, 'no')
  }
];
