const tmi = require('tmi.js'); 	//twitch IRC (chat)
const BotState = require('../entity/BotState')
const Logic = require('./Logic');

module.exports = class Bot {
    constructor(business) {
        this.tmiConfig = {
            options: {
                debug: true
            },
            connection: {
                reconnect: true
            },
            identity: {
                username: "deathbot___",
                password: "oauth:20r9jz734trg2ydvbwscgwh30t6i5y"
            },
            channels: [
                "mastersnakou"
                //"tenebrisluxnoctis"
            ]
        };

        this.logic = new Logic(business);
        this.client = new tmi.client(this.tmiConfig);
    }

    /**
     * Lance le bot
     */
    run() {
        var myThis = this;

        myThis.logic.startBotConfig(function (botState) {
            myThis.botState = botState;

            //Connection au chat
            myThis.client.connect();

            //Evenement lors de l'apparition d'un nouveau message dans le chat
            myThis.client.on('chat', (channel, user, message, isSelf) => {
                //si c'est ma pomme, je fais rien !
                if (isSelf) return;

                //si c'est un utilisateur autorisé
                if (myThis.logic.isAuthorizedUser(user['display-name'])) {
                    let fullCommand = myThis.logic.commandParser(message);

                    if (fullCommand) {
                        let command = fullCommand[1];
                        let param = fullCommand[2];

                        switch (command) {
                            case "bot":
                                myThis.client.say(channel, "Prêt à compter chef PogChamp");
                                break;
                            case "resume":
                                myThis.client.say(channel, myThis.logic.getResume());
                                break;
                            /* case "reset":
                                myThis.logic.resetData();
                                myThis.client.say(channel, "Le compteur à bien été reset :)");
                                break; */
                            /* case "deco":
                                //logic.disconnectDb();
                                myThis.client.say(channel, "Ce fut un plaisir de vous servir ! :)");
                                myThis.client.disconnect();
                                break; */
                            case "setcurgame":
                                myThis.logic.setGame(param.replace(" ", ""), function (title) {
                                    myThis.client.say(channel, "Le jeu a été changé pour : " + title + " ! masterForce");
                                });
                                break;
                            case "curgame":
                                myThis.logic.getGame(function (gameName) {
                                    myThis.client.say(channel, "Le jeu actuellement compté est : " + gameName + " ! masterKC");
                                })
                                break;
                            case "mute":
                                myThis.logic.updateMode(myThis.botState.muted, function (msg) {
                                    myThis.client.say(channel, msg)
                                })
                            case "+":
                                var array = param.split(' ')
                                var count = (array[2] ? parseInt(array[2]) : 1)
                                count = (!isNaN(count)? count : 1)
                                myThis.logic.incrementCriterion(array[1], count, function (msg, modeSilence) {
                                    if (!modeSilence)
                                        myThis.client.say(channel, msg)
                                    else
                                        myThis.client.whisper(user['display-name'], 1, msg)
                                })
                                break;
                            case "-":
                                var array = param.split(' ')
                                var count = (array[2] ? parseInt(array[2]) : 1)
                                count = (!isNaN(count)? count : 1)
                                myThis.logic.decrementCriterion(array[1], count, function (msg, modeSilence) {
                                    if (!modeSilence)
                                        myThis.client.say(channel, msg)
                                    else
                                        myThis.client.whisper(user['display-name'], msg)
                                })
                                break;
                        }
                    }
                }
            });
        });
    }
}