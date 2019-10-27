const BotGame = require('./BotGame')

module.exports = class BotState {
    constructor(){
        this.game = new BotGame()
        this.users = []
        this.muted = false
    }
}