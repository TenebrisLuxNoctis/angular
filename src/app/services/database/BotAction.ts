export class BotAction {

    private db: any;

    constructor(db){
        this.db = db;
    }

    /**
     * Met à jour le jeu courant dans la base de données
     * @param {string} game 
     * @param {function} callback 
     */
    setCurrentGame(game, callback) {
        this.db.run(`UPDATE config SET value = ? WHERE name = "currentGame"`, [game], function (err) {
            if (err) {
                return console.log(err.message);
            }
            callback();
        });
    }

    /**
     * Met à jour la valeur du critère en base de données
     * @param {array} critere 
     */
    saveCriterion(critere) {
        this.db.run(`UPDATE stats SET value = ? WHERE critereId = ? AND gameId = ?`, [critere.value, critere.critereId, critere.gameId], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`${critere.name} has been updated to ${critere.value}`);
        });
    }

    /**
     * Met à jour le mode du bot (silencieux ou non)
     * @param {boolean} mode 
     * @param {function} callback 
     */
    updateSilenceMode(mode, callback){
        this.db.run(`UPDATE config SET value = ? WHERE name = "silenceMode"`, [mode], function(err){
            if(err){
                console.log(err);
                return callback(false)
            }
            callback(true)
        })
    }
}