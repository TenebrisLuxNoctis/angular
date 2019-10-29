module.exports = class BoptQuery {

    constructor(db){
        this.db = db;
    }

    /**
     * Récupère la liste des utilisateurs autorisés
     * @param {function} callback 
     */
    getAuthorizedUsers(callback) {
        var users = [];
        this.db.all(`SELECT name FROM users`, [], function (err, rows) {
            rows.forEach((elt) => {
                users.push(elt.name);
            });
            callback(users);
        });
    }

    /**
     * Récupération du jeu sur lequel on compte (shortName)
     * @param {function} callback 
     */
    getCurrentGame(callback) {
        this.db.get(`SELECT value FROM config WHERE name = "currentGame"`, [], function (err, res) {
            if (err) {
                return console.log("Patatra !! Erreur lors de la récupération du jeu :'(");
            }
            callback(res.value);
        });
    }

    /**
     * Récupère le titre du jeu sur lequel on compte
     * @param {function} callback 
     */
    getCurrrentGameTitle(callback) {
        this.db.get(`SELECT title FROM games WHERE shortName IN (SELECT value FROM config WHERE name = "currentGame")`, [], function (err, res) {
            if (err) {
                console.log(err)
                return callback("DB_ERROR"); 
            }
            callback(res.title)
        })
    }

    getMode(callback){
        this.db.get(`SELECT value FROM config WHERE name = "silenceMode"`, function(err, res){
            if(err){
                console.log(err)
                return callback(false)
            }
            callback(res.value == "1")
        })
    }

    /**
     * Charge toutes les données sur le jeu nécessaires au fonctionnement du bot
     * @param {string} jeu 
     * @param {function} callback 
     */
    loadBotContext(jeu, callback) {
        var sql = `SELECT criteres.id AS critereId, games.id AS gameId, title,  name, resumeString, displayedString, value
        FROM criteres JOIN stats ON criteres.id = critereId JOIN games ON games.id = gameID WHERE shortName = ?
        ORDER BY criteres.summaryOrder`;

        this.db.all(sql, [jeu], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }

            callback(rows);
        });
    }

    checkGameWithShortName(shortName, callback){
        var sql = `SELECT title FROM games WHERE shortName = ?`

        this.db.get(sql, [shortName], function(err, res){
            if(err)
                return callback("error")
            if(res != undefined)
                callback(res.title)
            else 
                callback("error")
        })
    }
}