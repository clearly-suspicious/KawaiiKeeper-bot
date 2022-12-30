const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('custom')
    .setDescription('Generates an image with your custom tag')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription(
          'Please enter your custom prompt, include as much detail as possible for the best results'
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Regenerate')
        .setStyle(ButtonStyle.Primary)
    );
    await interaction.reply({
      content: prompt + ' image',
      components: [row],
    });
  },
};
