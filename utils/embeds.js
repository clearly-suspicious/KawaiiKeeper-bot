const { EmbedBuilder } = require('discord.js');

module.exports = {
  createPromptEmbed: function (prompt, thumbnailLink, imageLink) {
    console.log('creating embedding here');
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Prompt: ' + prompt)
      .setThumbnail(thumbnailLink)
      .setImage(imageLink)
      .setTimestamp()
      .setFooter({
        text: 'Some footer text here',
        iconURL: imageLink,
      });

    return embed;
  },
};
