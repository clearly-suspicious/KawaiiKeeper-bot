const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require('discord.js');

const { createPromptembed } = require('../utils/embeds');

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
    const imageLink =
      'https://preview.redd.it/2y6iwo32z7581.png?width=640&crop=smart&auto=webp&s=34604909104f02d605772e714d001f60c8ed372c';
    // TODO: mimic api call for imageLink later obv

    const embedding = createPromptembed(prompt, imageLink, imageLink);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Regenerate')
        .setStyle(ButtonStyle.Primary)
    );
    await interaction.reply({
      components: [row],
      embeds: [embedding],
    });
  },
};