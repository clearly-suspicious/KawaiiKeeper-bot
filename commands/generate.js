const axios = require('axios');
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  AttachmentBuilder,
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
        .setRequired(false)
        .addChoices(
          { name: 'Beach', value: 'Beach' },
          { name: 'City', value: 'City' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('character')
        .setDescription('The subject of the image')
        .setRequired(false)
        .addChoices(
          { name: 'Girl', value: 'Girl' },
          { name: 'Boy', value: 'Boy' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('custom')
        .setDescription('Add your own custom prompt')
        .setRequired(false)
    ),
  async execute(interaction) {
    let optionValues = interaction.options._hoistedOptions;
    let prompt = '';
    optionValues.forEach((element) => {
      prompt += element.value + ',';
    });

    await interaction.deferReply();
    const response = await axios.get(
      process.env.API_URL +
        '/generate' +
        `${prompt ? '?prompt=' + prompt : ''}`,
      {
        responseType: 'stream',
      }
    );
    // const imagePath = path.resolve(
    //   path.dirname(__dirname),
    //   'images',
    //   'image.png'
    // );
    // const writer = fs.createWriteStream(imagePath);
    // image.data.pipe(writer);

    const file = new AttachmentBuilder(response.data, {
      name: 'image.png',
    });
    const embedding = createPromptEmbed(
      prompt,
      null,
      'attachment://image.png',
      interaction.user.username,
      interaction.user.discriminator
    );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Regenerate')
        .setStyle(ButtonStyle.Primary)
    );
    const reply = await interaction.editReply({
      // components: [row],
      embeds: [embedding],
      files: [file],
    });

    console.log(reply.embeds[0].image.url);
  },
};
