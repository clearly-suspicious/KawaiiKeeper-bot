const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require('discord.js');

const { createPromptEmbed } = require('../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generate')
    .setDescription('Generates image with tags!')
    .addStringOption((option) =>
      option
        .setName('background')
        .setDescription('The background of the image')
        .setRequired(true)
        .addChoices(
          { name: 'Beach', value: 'Beach' },
          { name: 'City', value: 'City' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('character')
        .setDescription('The subject of the image')
        .setRequired(true)
        .addChoices(
          { name: 'Girl', value: 'Girl' },
          { name: 'Boy', value: 'Boy' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('hairstyle')
        .setDescription("style for your character's hair <type, color>")
        .setRequired(true)
    ),
  async execute(interaction) {
    let optionValues = interaction.options._hoistedOptions;
    let prompt = '';
    optionValues.forEach((element) => {
      prompt += element.value + ',';
    });

    const imageLink =
      'https://preview.redd.it/2y6iwo32z7581.png?width=640&crop=smart&auto=webp&s=34604909104f02d605772e714d001f60c8ed372c';
    // TODO: mimic api call for imageLink later obv

    const embedding = createPromptEmbed(prompt, imageLink, imageLink);

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
