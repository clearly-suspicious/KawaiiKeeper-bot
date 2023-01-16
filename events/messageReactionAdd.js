module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, client) {
    let message = reaction.message;
    if (
      message.author.bot &&
      message.author.username === 'KawaiiKeeper' &&
      message.author.discriminator === '1538'
    ) {
      // console.log(message.interaction.user.id, message.reactions);
      if (reaction._emoji.name === '❤️') {
        console.log('liked by', client.id);
      }
    }
  },
};
