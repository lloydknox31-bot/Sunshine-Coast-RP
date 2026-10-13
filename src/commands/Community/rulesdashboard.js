
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
      })
      .setImage('https://cdn.discordapp.com/attachments/1559177088043327509/1559486607109791744/Sunshine_Coast_Roleplay_Rules_Banner.png?ex=6acf4094&is=6acdef14&hm=bf08a1b869338b5d92c00b87577c8e8f492709226731863ba4322410dad1131d&');

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
