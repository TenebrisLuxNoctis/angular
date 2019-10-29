const sqlite3 = require('sqlite3').verbose(); //gestion BDD
const botQuery = require('./BotQuery')
const botAction = require('./BotAction')
const criterionQuery = require('./CriterionQuery')
const criterionAction = require('./CriterionAction')
const gameQuery = require('./GameQuery')
const gameAction = require('./GameAction')

module.exports = class Business {
    constructor() {
        this.db = new sqlite3.Database('./db/stats.sql', (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connecté à la base de données SQLite.');
        });

        this.botQuery = new botQuery(this.db)
        this.botAction = new botAction(this.db)
        this.criterionQuery = new criterionQuery(this.db)
        this.criterionAction = new criterionAction(this.db)
        this.gameQuery = new gameQuery(this.db)
        this.gameAction = new gameAction(this.db)
    }

    /**
     * Ferme la connection à la base de données
     */
    closeConnection() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Fermeture de la connection à la base de données.');
        });
    }
}