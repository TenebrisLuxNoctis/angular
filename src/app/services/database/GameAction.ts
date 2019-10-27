export class GameAction {
    private db: any;

    constructor(db){
        this.db = db;
    }

    /**
     * Ajoute des critères sur un jeu (ne peut pas en supprimer !!!)
     * @param {string} game 
     * @param {Array} criteres 
     * @param {function} callback 
     */
    updateGameCriterions(game, criteres, callback) {
        var db = this.db;
        db.all(`SELECT criteres.id, gameid FROM criteres JOIN stats ON critereid = criteres.id JOIN games ON gameid = games.id WHERE title = ?`, [game], function (err, rows) {
            if (err) {
                callback(err.message); return;
            }

            var add = "";
            criteres.forEach(element => {
                if (rows.length == 0 || rows.indexOf(element) == -1) //Si le critère n'existe pas sur le jeu
                    add += ` (${rows[0].gameId}, ${element}, 0),`;
            });

            if (add != "")
                add = add.substring(0, add.length - 1);
            db.run(`INSERT INTO stats(gameId, critereId, value) VALUES` + add, [], function (err) {
                if (err) {
                    callback(err.message); return;
                }
                callback(`Les critères ont bien été mis à jour pour ${game}`);
            });
        });
    }

    /**
     * Ajoute un jeu et configure ses critères attribués
     * @param {Array} game 
     * @param {function} callback 
     */
    addGame(game, callback) {
        var db = this.db
        db.run(`INSERT INTO games(title, shortName, statusEnd) VALUES(?, ?, ?)`, [game.title, game.shortName, 0], function (err) {
            if (err) {
                callback(err.message); return;
            }

            var gameId = this.lastID;
            var tab = game.criteres

            var sql = `INSERT INTO stats(gameId, critereId, value) VALUES`;
            for (var critere in tab) {
                sql += ` (${gameId}, ${tab[critere]}, 0),`;
            }
            sql = sql.substring(0, sql.length - 1);
            db.run(sql, [], function (err) {
                if (err) {
                    callback(err.message); return;
                }
                callback("Le jeu a bien été ajouté !");
            });
        });
    }

    /**
     * Supprime entièrement le jeu de la base de données
     * @param {number} gameId 
     * @param {function} callback 
     */
    deleteGame(gameId, callback) {
        var db = this.db
        db.run(`DELETE FROM stats WHERE gameId = ?`, [gameId], function (err) {
            if (err) {
                callback(err.message); return;
            }
            db.run(`DELETE FROM games WHERE id = ?`, [gameId], function (err) {
                if (err) {
                    callback(err.message); return;
                }
                callback("Le jeu a bien été supprimé !");
            });
        });
    }
}