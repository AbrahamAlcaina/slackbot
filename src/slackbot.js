import SlackBot from 'slackbots';

const bot = new SlackBot({
  token: process.env.TOKEN,
  name: 'Deploymet bot',
});

const receivers = ['abraham.alcaina', 'rosa'];

const params = { icon_emoji: ':fireworks:' };

export const getMessage = (message) => {
  const props = message.attachments[0].fields;
  const branch = props
    .filter(({ title }) => title === 'Branch')
    .reduce((current, { value }) => value || current, 'no branch');
  const project = props
    .filter(({ title }) => title === 'Project')
    .reduce((current, { value }) => value === 'cirsa_gamesito' ? 'gamesito' : current, 'phasersito');
  let commitMessage = props
    .filter(({ title }) => title === 'Build succeeded')
    .map(({ value }) => value.toString())
    .reduce((current, value) => value || current, '');
  commitMessage = commitMessage.substring(commitMessage.indexOf('|') + 1, commitMessage.length - 1);
  return `${project} in ${branch} deployed!
  version: ${commitMessage}`;
};

export const isProduction = (message) => {
  const props = message.attachments[0].fields;
  const branch = props
    .filter(({ title }) => title === 'Branch')
    .reduce((current, { value }) => value || current, 'no branch');
  return branch === 'master';
};

bot.on('start', () =>
  bot.postMessageToChannel('general', `Hello bro!
I'm here`, params)
);

bot.on('message', (message) => {
  if (message.type !== 'message') {
    return;
  }
  if (message.subtype !== 'bot_message') {
    return;
  }
  if (message.channel !== 'C0356K00E') {
    return;
  }
  if (message.bot_id !== 'B034HMN0K') {
    return;
  }
  if (!isProduction(message)) {
    return;
  }
  receivers.map(receiver => bot.postMessageToUser(receiver, getMessage(message), params));
});

export default bot;
