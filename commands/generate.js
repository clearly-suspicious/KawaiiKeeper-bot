const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generate')
    .setDescription('Generates image with tags!'),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Click me!')
        .setStyle(ButtonStyle.Primary)
    );
    await interaction.reply({
      content: 'Please choose from the following tags: ',
      components: [row],
    });
  },
};
