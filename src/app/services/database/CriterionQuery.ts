export class CriterionQuery {
    private db : any;

    constructor(db){
        this.db = db;
    }

    /**
     * Récupère la liste des critères
     * @param {function} callback 
     */
    getCriterionsList(callback) {
        var sql = `SELECT id, name, description FROM criteres ORDER BY id ASC`;
        this.db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }

    /**
     * Récupère un critère via son Id
     * @param {number} criterionId 
     * @param {function} callback 
     */
    getCriterionById(criterionId, callback) {
        var sql = `SELECT * FROM criteres WHERE id  = ?`;
        this.db.all(sql, [criterionId], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }
}