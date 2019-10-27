module.exports = class CriterionAction {

    constructor(db){
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
            db.run(`INSERT INTO criteres(name, resumeString, displayedString, summaryOrder, description) VALUES(?, ?, ?, ?, ?, ?)`, [critere.name, critere.resumeString, critere.displayedString, ordreResume.summaryOrder + 1, critere.description], function (err) {
                if (err) {
                    callback(err.message); return;
                }
                callback("Le critère a bien été ajouté");
            });
        });
    }

    /**
     * Met à jour une critère
     * @param {Array} critere 
     * @param {function} callback 
     */
    updateCriterion(critere, callback) {
        var sql = `UPDATE criteres SET name = "${critere.name}", resumeString = "${critere.resumeString}", displayedString = "${critere.displayedString}" WHERE id = ${critere.criterionId}`

        this.db.run(sql, function (err) {
            if (err) {
                callback(err.message); return;
            }
            callback("Le critère a bien été mis à jour");
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
                callback(err.message); return;
            }
            db.run(`DELETE FROM criteres WHERE id = ?`, [criterionId], function (err) {
                if (err) {
                    callback(err.message); return;
                }
                callback("Le critère a bien été supprimé !");
            });
        });
    }
}