
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js';

const REQUIRED_VOTES = 15;

// Keeps track of each member's vote for each message.
const votesByMessage = new Map();

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
  await interaction.message.delete();

  return interaction.editReply({
    content: '✅ The session vote reached 15 YES votes and has been automatically removed.'
  });
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
