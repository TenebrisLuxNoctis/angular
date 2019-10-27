module.exports = class GameQuery {

    constructor(db){
        this.db = db;
    }

    /**
     * Récupère la liste des jeux
     * @param {function} callback 
     */
    getGamesList(callback) {
        var sql = `SELECT id, title, shortName FROM games ORDER BY id ASC`;
        this.db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }

    /**
     * Récupère les infos d'un jeu via son Id
     * @param {number} gameId 
     * @param {function} callback 
     */
    getGameById(gameId, callback) {
        var sql = `SELECT title FROM games WHERE games.id = ?`;

        this.db.all(sql, [gameId], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }

    /**
     * Récupère les stats d'un jeu
     * @param {number} gameId 
     * @param {function} callback 
     */
    getGameStats(gameId, callback) {
        var sql = `SELECT criteres.id, name, value, description, resumeString FROM stats 
        JOIN criteres ON stats.critereId = criteres.id 
        JOIN games ON games.id = stats.gameId WHERE games.id = ?`;

        this.db.all(sql, [gameId], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }

}