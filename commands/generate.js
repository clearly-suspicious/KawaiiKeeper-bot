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
    console.log(
      interaction.options.getString('background'),
      interaction.options.getString('character'),
      interaction.options.getString('hairstyle')
    );
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Regenerate')
        .setStyle(ButtonStyle.Primary)
    );
    await interaction.reply({
      content: 'Image',
      components: [row],
    });
  },
};
