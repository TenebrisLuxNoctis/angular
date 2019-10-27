const BotState = require('../entity/BotState')
const Criterion = require('../entity/Criterion')

const prefix = "!";
var stats = {};

module.exports = class Logic {
    constructor(business) {
        this.business = business
        this.prefix = "!"

        this.botState = new BotState()
    }


    /**
     * Vérification de l'autorisation de l'utilisateur
     * @param {string} user 
     */
    isAuthorizedUser(user) {
        return (this.botState.users.indexOf(user.toLowerCase()) > -1)
    }

    /**
     * retourne un 's' si le nombre est > 1
     * @param {number} nombre 
     */
    givePluriel(nombre) {
        var retour = "";
        if (nombre > 1)
            retour = "s";
        return retour;
    }

    /**
     * récupère le texte d'une commande
     * @param {*} message 
     */
    commandParser(message) {
        let prefixEscaped = prefix.replace(/([.?*^$[\]\\(){}|])/g, "\\$1");
        let regex = new RegExp("^" + prefixEscaped + "([a-zA-Z+\-]+)\s?(.*)");
        return regex.exec(message);
    }

    /**
     * Affiche la valeur d'un critère
     * @param {*} critere 
     */
    getCriterionDisplayedString(critere) {
        return critere.displayedString.replace(/#/g, this.givePluriel(critere.value)).replace(/§/, critere.value);
    }

    /**
     * Affiche le résumé d'un jeu
     */
    getResume() {
        var myThis = this;
        var retour = "";
        retour += "Le score est actuellement de ";

        myThis.botState.game.stats.forEach(function (critere) {
            retour += critere.value + " " + critere.resumeString.replace(/#/g, myThis.givePluriel(critere.value)) + " , ";
        })

        retour += "Hurrah ! Kappa";

        return retour;
    }

    /**
     * Recherche un critère dans la liste des critères du jeu actuel
     */
    searchCriterion(criterion) {
        var res = null
        this.botState.game.stats.forEach(function (critere) {
            
            if (critere.name == criterion) {
                res = critere
            }
        })
        return res
    }

    /**
     * Décrémente la valeur du critère
     */
    decrementCriterion(criterion, count, callback) {
        var critere = this.searchCriterion(criterion)
        if (critere != null) {
            critere.value -= count
            this.saveCriterion(critere)
            callback(this.getCriterionDisplayedString(critere), this.botState.muted)
        }
    }

    /**
     * Incrémente la valeur du critère
     */
    incrementCriterion(criterion, count, callback) {
        var critere = this.searchCriterion(criterion)
        if (critere != null) {
            critere.value += count
            this.saveCriterion(critere)
            callback(this.getCriterionDisplayedString(critere), this.botState.muted)
        }
    }

    /**
     * @deprecated
     * Réinitialise les données sur le jeu actuel
     */
    resetData() {
        for (let prop in this.botState.game.stats) {
            var critere = this.botState.game.stats[prop];
            critere.value = 0;
        }
    }

    /**
     * Sauvegarde en base la valeur du critère
     */
    saveCriterion(critere) {
        this.business.botAction.saveCriterion(critere);
    }

    /**
     * Récupère le titre du jeu actuellement compté
     */
    getGame(callback) {
        if (this.botState.game.stats != {}) {
            this.business.botQuery.getCurrrentGameTitle(function (gameName) {
                callback(gameName)
            });
        }
        else
            callback("ERROR");
    }

    /**
     * Modifie le jeu actuel
     * @param {string} game 
     * @param {function} callback 
     */
    setGame(game, callback) {
        var myThis = this
        myThis.business.botQuery.checkGameWithShortName(game, function(title){
            if(title != "error")
            {
                myThis.business.botAction.setCurrentGame(game, function () {
                    myThis.loadContext(game, title, callback);
                });
            }
        })
    }

    /**
     * @deprecated
     * Déconnecte la base de données
     */
    disconnectDb() {
        this.business.closeConnection();
    }

    /**
     * Charge les statistiques sur le jeu actuel
     * @param {string} game 
     * @param {string} title 
     * @param {function} callback 
     */
    loadContext(game, title, callback) {
        var myThis = this;

        myThis.business.botQuery.loadBotContext(game, function (rows) {
            myThis.botState.game.stats = []
            rows.forEach((row) => {
                myThis.botState.game.stats.push(new Criterion(row.name, row.gameId, row.critereId, row.resumeString, row.displayedString, row.value, row.description))
            });

            myThis.botState.game.title = rows[0].title;
            callback(title);
        });
    }

    /**
     * Lance la configuration du bot sur le dernier jeu compté
     * @param {function} callback 
     */
    startBotConfig(callback) {
        var myThis = this;

        myThis.business.botQuery.getAuthorizedUsers(function (users) {
            myThis.botState.users = users

            myThis.business.botQuery.getMode(function (muted) {
                myThis.botState.muted = muted

                myThis.business.botQuery.getCurrentGame(function (game) {
                    myThis.loadContext(game, "", function () {
                        callback(myThis.botState)
                    })
                })
            })
        })
    }

    /**
     * Met à jour le mode de fonctionnement du bot
     */
    updateMode(mode, callback) {
        var myThis = this
        myThis.botState.muted = !myThis.botState.muted
        myThis.business.botAction.updateSilenceMode(mode, function (done) {
            if (done) {
                if (myThis.botState.muted)
                    callback("Le mode muet a été activé masterLynx")
                else
                    callback("Le mode muet n'est plus ! masterKratos")
            } else {
                callback("Une erreur est survenue ! :(")
            }
    })
    }
}