#Telegram logger decorator

###Config example:

```
module.exports.tglog = {
   
     level: 'debug',
     chatId: '-332266582',
     token: '945664034:AAG7jkipcweEngCB2oX1k7VVrxreoeqkoFE'
   
   };
```
#####Level
There is a list of log levels, ordered in ascending priority:
1. ship
2. silly
3. verbose
4. blank
5. info
6. debug
7. warn
8. error
9. crit

In field "level" in config file, you can choose log level, from which log will be printed out by telegram bot.
