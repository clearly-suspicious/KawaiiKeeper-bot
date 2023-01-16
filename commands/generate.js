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
          { name: 'Mountains', value: 'Mountains' },
          { name: 'Forest', value: 'Forest' },
          { name: 'Sky', value: 'Sky' },
          { name: 'Indoors', value: 'Indoors' },
          { name: 'Dungeon', value: 'Dungeon' },
          { name: 'Desert', value: 'Desert' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('character')
        .setDescription('The subject of the image')
        .setRequired(false)
        .addChoices(
          { name: 'Girl', value: 'Girl' },
          { name: 'Woman', value: 'Woman' },
          { name: 'Man', value: 'Man' },
          { name: 'Boy', value: 'Boy' },
          { name: 'Non-Binary', value: 'Non-Binary' },
          { name: 'Demon', value: 'Demon' },
          { name: 'Angel', value: 'Angel' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('hair')
        .setDescription('Hair style of the subject')
        .setRequired(false)
        .addChoices(
          { name: 'Straight', value: 'Straight' },
          { name: 'Curly', value: 'Curly' },
          { name: 'Short', value: 'Short' },
          { name: 'Frizzy', value: 'Frizzy' },
          { name: 'Wavy', value: 'Wavy' },
          { name: 'Long', value: 'Long' },
          { name: 'Braided', value: 'Braided' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('weather')
        .setDescription('The weather in the image')
        .setRequired(false)
        .addChoices(
          { name: 'Snowy', value: 'Snowy' },
          { name: 'Sunny', value: 'Sunny' },
          { name: 'Rainy', value: 'Rainy' },
          { name: 'Cloudy', value: 'Cloudy' },
          { name: 'Stormy', value: 'Stormy' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('items')
        .setDescription('Any items that you want in the image')
        .setRequired(false)
        .addChoices(
          { name: 'Sword', value: 'Sword' },
          { name: 'Ball', value: 'Ball' },
          { name: 'Chocolate', value: 'Coconut' },
          { name: 'Dagger', value: 'Dagger' }
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

    optionValues.forEach((element, index) => {
      prompt += element.value + (index != optionValues.length - 1 ? ',' : '');
    });

    console.log('prompt: ', prompt);

    await interaction.deferReply();
    const response = await axios.get(
      process.env.ML_API_URL +
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

    reply.react('❤️');
    reply.react('🔥');

    //upload image to db
    console.log(interaction.user);
    const uploadedImageResponse = await axios.post(
      process.env.WEB_API_URL + '/photo',
      { url: reply.embeds[0].image.url, prompt: prompt, nsfw: false },
      {
        headers: {
          Authorization: process.env.WEB_API_KEY,
          'discord-id': interaction.user.id,
          'discord-username': encodeURIComponent(interaction.user.username),
        },
      }
    );
  },
};
