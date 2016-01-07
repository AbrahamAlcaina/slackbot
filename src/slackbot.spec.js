import { expect } from 'chai';
import { getMessage } from './slackbot';

describe('slackbot test fixture', () => {
  const message = {
    text: '',
    bot_id: 'B034HMN0K',
    attachments: [{
      fallback: 'Successful build for branch development on project bernatmv/cirsa_phasersito by aalcaina.',
      id: 1,
      color: '36a64f',
      fields: [{
        title: 'Build succeeded',
        value: '<https://codeship.com/projects/51211/builds/11031393|1.0.19>',
        short: true,
      }, {
        title: 'Committer',
        value: 'aalcaina',
        short: true,
      }, {
        title: 'Branch',
        value: 'development',
        short: true,
      }, {
        title: 'Project',
        value: 'cirsa_phasersito',
        short: true,
      }],
    }],
    type: 'message',
    subtype: 'bot_message',
    channel: 'C0356K00E',
    ts: '1452160004.000023',
  };

  it('should parse the deployment message', () => {
    const outputMessage = getMessage(message);
    expect(outputMessage).to.equal('phasersito in development deployed!\n  version: 1.0.19');
  });

  it('should parse gamesito message', () => {
    const gamesitoMessage = Object.assign({}, message);
    gamesitoMessage.attachments[0].fields[3].value = 'cirsa_gamesito';
    const outputMessage = getMessage(message);
    expect(outputMessage).to.equal('gamesito in development deployed!\n  version: 1.0.19');
  });
});
