
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
      .setPlaceholder('dashboard')
      .addOptions(
  {
    label: 'Discord Rules',
    description: 'View our Discord community rules',
    value: 'discord',
    emoji: '💬'
  },
  {
    label: 'Game Rules',
    description: 'View our ER:LC roleplay rules',
    value: 'game',
    emoji: '🌐'
  }
);

    const row = new ActionRowBuilder()
      .addComponents(menu);

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.reply({
      content: '✅ Rules Dashboard posted successfully!',
      flags: 64
    });
  }
};
