module.exports = class Criterion{
    constructor(name, gameId, critereId, resumeString, displayedString, value, description){
        this.name = name
        this.gameId = gameId
        this.critereId = critereId
        this.resumeString = resumeString
        this.displayedString = displayedString
        this.value = value
        this.description = description
    }
}