module.exports = class GameAction {

    constructor(db) {
        this.db = db;
    }

    /**
     * Met un jeu à jour
     * @param {Game} game 
     * @param {function} callback 
     */
    updateGame(game, callback) {
        var db = this.db;
        db.run(`UPDATE games SET title= ?, shortName= ? WHERE id= ?`, [game.title, game.shortName, game.id], function (err) {
            if (err) {
                callback({ msg: err.message }); return;
            }

            //Mise à jour des critères
            db.all(`SELECT critereId FROM stats WHERE gameId = ?`, [game.id], function (err, rows) {
                if (err) {
                    callback({ msg: err.message }); return;
                }
                var old = [];
                var nouv = game.criteres;
                rows.forEach(element => {
                    old.push(element.critereId);
                });
    
                var toDelete = old.filter(function (elt) {
                    return nouv.indexOf(elt) == -1
                });
                var toAdd = nouv.filter(function (elt) {
                    return old.indexOf(elt) == -1;
                });
    
                if (toAdd.length > 0) {
                    var add = "";
                    toAdd.forEach(element => {
                        add += ` (${game.id}, ${element}, 0),`;
                    });
    
                    add = add.substring(0, add.length - 1);
                    db.run(`INSERT INTO stats(gameId, critereId, value) VALUES` + add, [], function (err) {
                        if (err) {
                            callback({ msg: err.message }); return;
                        }
    
                        if (toDelete.length > 0) {
                            var del = "";
                            toDelete.forEach(element => {
                                del += `${element},`;
                            });
                            del = del.substring(0, del.length - 1);
                            del += ')';
                            db.run(`DELETE FROM stats WHERE gameId = ? AND critereId IN (` + del, [game.id], function (err) {
                                if (err) {
                                    callback({ msg: err.message }); return;
                                }
                                callback({ msg: "OK" });
                            });
                        }
                        else
                            callback({ msg: "OK" });
                    });
                }
            });
        })
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
                callback({ msg: err.message }); return;
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
                    callback({ msg: err.message }); return;
                }
                callback({ msg: "OK", id: gameId });
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
                callback({ msg: err.message }); return;
            }
            db.run(`DELETE FROM games WHERE id = ?`, [gameId], function (err) {
                if (err) {
                    callback({ msg: err.message }); return;
                }
                callback({ msg: "OK" });
            });
        });
    }
}