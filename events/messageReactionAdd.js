module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, client) {
    console.log('here');
    let message = reaction.message;
    console.log(
      'printing: ',
      message,
      message.author,
      message.embeds[0].image.url
    );
  },
};
