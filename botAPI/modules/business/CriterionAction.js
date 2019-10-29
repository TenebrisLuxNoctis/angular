module.exports = class CriterionAction {

    constructor(db) {
        this.db = db;
    }

    /**
     * Ajoute un critère
     * @param {Array} critere 
     * @param {function} callback 
     */
    addCriterion(critere, callback) {
        var sql = `SELECT summaryOrder FROM criteres ORDER BY summaryOrder DESC LIMIT 0,1`;
        this.db.get(sql, [], (err, ordreResume) => {
            this.db.run(`INSERT INTO criteres(name, resumeString, displayedString, summaryOrder, description) VALUES(?, ?, ?, ?, ?)`, [critere.name, critere.resumeString, critere.displayedString, ordreResume.summaryOrder + 1, critere.description], function (err) {
                if (err) {
                    callback({ msg: err.message }); return;
                }
                callback({ msg: "OK" });
            });
        });
    }

    /**
     * Met à jour une critère
     * @param {Array} critere 
     * @param {function} callback 
     */
    updateCriterion(critere, callback) {
        var sql = `UPDATE criteres SET name = "${critere.name}", resumeString = "${critere.resumeString}", displayedString = "${critere.displayedString}", description = "${critere.description}" WHERE id = ${critere.id}`
        this.db.run(sql, function (err) {
            if (err) {
                callback({ msg: err.message }); return;
            }
            callback({ msg: "OK" });
        })
    }

    /**
     * Supprime un critère de la base de données
     * @param {number} criterionId 
     * @param {function} callback 
     */
    deleteCriterion(criterionId, callback) {
        var db = this.db
        db.run(`DELETE FROM stats WHERE critereId = ?`, [criterionId], function (err) {
            if (err) {
                callback({ msg: err.message }); return;
            }
            db.run(`DELETE FROM criteres WHERE id = ?`, [criterionId], function (err) {
                if (err) {
                    callback({ msg: err.message }); return;
                }
                callback({ msg: "OK" });
            });
        });
    }
}