const Telegraf = require('telegraf');
const LEVELS = ['ship', 'silly', 'verbose', 'blank', 'info', 'debug', 'warn', 'error', 'crit'];
const bot = new Telegraf(sails.config.tglog.token);

var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = function (sails) {

  return {

    initialize: function (cb) {

      if (!sails.config.tglog) {

        sails.log.warn('Could not find config for tg-logger');

        return cb();
      }

      bot.launch();

      sails.after('hook:logger:loaded', function () {

        for (let level of LEVELS) {
          sails.log[level] = logDecorator(sails.log[level], level);
        }

        sails.log = logDecorator(sails.log);

        return cb();

      });

    }

  }

};

function logDecorator(log, level) {

  let data = Object.entries(log);

  console.log(data);

  async function decorator() {

    level = level || 'info';

    if (LEVELS.indexOf(level) >= LEVELS.indexOf(sails.config.tglog.level)) {
      let log_message = Array.from(arguments).join(" ");
      let message = appDir.split('/').reverse()[0] + "|" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "|" + level + "\n" + log_message;

      if (message) {
        await bot.telegram.sendMessage(sails.config.tglog.chatId, message);
      }
    }

    return log.call(this, ...arguments);
  }

  data.forEach((element) => {
    decorator[element[0]] = element[1];
  });

  return decorator;

}


