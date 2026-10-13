
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} from 'discord.js';

export default {
  slashOnly: true,

  data: new SlashCommandBuilder()
    .setName('rulesdashboard')
    .setDescription('Post the Sunshine Coast Roleplay rules dashboard'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x245BFF)
      .setTitle('📜 Sunshine Coast Roleplay | Rules')
      .setDescription(
        '**Welcome to the Rules Dashboard!**\n\n' +
        'Please read and follow all Sunshine Coast Roleplay rules.\n\n' +
        '📋 **RULE CATEGORIES**\n' +
        'Select a category from the dropdown below to view its rules.'
      )
      .setFooter({
        text: 'Sunshine Coast Roleplay • Rules & Regulations'
      });

    const menu = new StringSelectMenuBuilder()
      .setCustomId('scrp_rules_menu')
      .setPlaceholder('Select a rule category...')
      .addOptions(
        {
          label: 'General Rules',
          value: 'general',
          emoji: '📋'
        },
        {
          label: 'Roleplay Rules',
          value: 'roleplay',
          emoji: '🎭'
        },
        {
          label: 'Civilian Rules',
          value: 'civilian',
          emoji: '🚗'
        },
        {
          label: 'Police Rules',
          value: 'police',
          emoji: '🚓'
        },
        {
          label: 'Fire & Rescue Rules',
          value: 'fire',
          emoji: '🚒'
        },
        {
          label: 'Ambulance Rules',
          value: 'ambulance',
          emoji: '🚑'
        },
        {
          label: 'Traffic Rules',
          value: 'traffic',
          emoji: '🚦'
        },
        {
          label: 'Radio Rules',
          value: 'radio',
          emoji: '📻'
        },
        {
          label: 'Staff Rules',
          value: 'staff',
          emoji: '🛡️'
        },
        {
          label: 'Punishments',
          value: 'punishments',
          emoji: '⚠️'
        }
      );

    const row = new ActionRowBuilder()
      .addComponents(menu);

    await interaction.reply({
      content: '📜 Posting the rules dashboard...',
      flags: 64
    });

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.editReply({
      content: '✅ Rules dashboard posted successfully!'
    });
  }
};
