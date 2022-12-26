const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generate')
    .setDescription('Generates image with tags!'),
  async execute(interaction) {
    await interaction.reply('I\'m working!');
  }
};
