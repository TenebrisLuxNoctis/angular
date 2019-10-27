const express = require('express')
const bodyParser = require('body-parser')
const Business = require('./modules/business/main')
const Bot = require('./modules/bot/Bot')

var app = express()
var business = new Business()
var bot = new Bot(business)

app.locals.givePluriel = function (nombre) {
    var retour = "";
    if (nombre > 1)
        retour = "s";
    return retour;
}

app.locals.getEmote = function (name){
    return `<img src="/images/${name}.png" class="emote" />`
}

app.locals.parseEmotes = function (text){
    text = text
        .replace(/Kappa/g, app.locals.getEmote("kappa"))
        .replace(/masterRIP/g, app.locals.getEmote("rip"))
        .replace(/masterScience/g, app.locals.getEmote("science"))
        .replace(/masterAltf4/g, app.locals.getEmote("altf4"))
        .replace(/masterOMG/g, app.locals.getEmote("omg"))
        .replace(/masterB/g, app.locals.getEmote("bruh"))
        .replace(/masterKratos/g, app.locals.getEmote("kratos"))
        .replace(/masterWOW/g, app.locals.getEmote("wow"))
    return text;
}

app
    .use(express.static('assets'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', function (req, res) {
        res.render('home.ejs')
    })
    .get('/game/:gameId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {

            business.gameQuery.getGameById(req.params.gameId, function (game) {
                var url = game[0].title.replace(/ /gi, "%20")
                business.gameQuery.getGameStats(req.params.gameId, function (stats) {
                    if (stats && stats.length > 0)
                        business.criterionQuery.getCriterionsList(function (crits) {
                            res.render('game.ejs', { title: game[0].title, id: req.params.gameId, gameStats: stats, gameCrits: crits })
                        })
                    else
                        res.status(404).render('404.ejs')
                })
            })
        }
        else
            res.status(404).render('404.ejs')
    })
    .get('/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionQuery.getCriterionById(req.params.criterionId, function (criterion) {
                res.render('criterion.ejs', { criterion: criterion[0] })
            })
        }
    })
    .get('/list/:type', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.type.length > 0) {
            switch (req.params.type) {
                case "game":
                    business.gameQuery.getGamesList(function (rows) {
                        res.render('list.ejs', { games: rows, criterions: null })
                    })
                    break;
                case "criterion":
                    business.criterionQuery.getCriterionsList(function (rows) {
                        res.render('list.ejs', { games: null, criterions: rows })
                    })
                    break;
                default:
                    res.status(404).render('404.ejs')
                    break;
            }
        }
    })
    .get('/doc', function (req, res) {
        business.criterionQuery.getCriterionsList(function (CriterionRows) {
            business.gameQuery.getGamesList(function(GameRows){
                res.render('doc.ejs', { criterions: CriterionRows, games : GameRows })
            })
        })
    })
    .get('/new/:type', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.type.length > 0) {
            switch (req.params.type) {
                case "game":
                    business.criterionQuery.getCriterionsList(function (rows) {
                        res.render('Ngame.ejs', { criterions: rows })
                    });

                    break;
                case "criterion":
                    res.render('Ncriterion.ejs', { criterion: null })
                    break;
                default:
                    res.status(404).render('404.ejs')
                    break;
            }
        }
    })
    .get('/edit/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionQuery.getCriterionById(req.params.criterionId, function (criterion) {
                res.render('Ncriterion.ejs', { criterion: criterion[0] })
            })
        }
        else
            res.status(404).render('404.ejs');
    })
    .get('/save/game/:gameId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {
            business.gameAction.deleteGame(req.params.gameId, function (msg) {
                res.render('save.ejs', { modifs: msg })
            })
        }
        else
            res.status(404).render('404.ejs');
    })
    .get('/save/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionAction.deleteCriterion(req.params.criterionId, function (msg) {
                res.render('save.ejs', { modifs: msg })
            })
        }
        else
            res.status(404).render('404.ejs');
    })
    .post('/save', function (req, res) {
        function callback(msg) {
            res.render('save.ejs', { modifs: msg })
        }

        var ids = []

        switch (req.body.action) {
            case "editcriteres":
                for (var k in req.body) {
                    if (req.body[k] === "on")
                        ids.push(k)
                }
                business.gameAction.updateGameCriterions(req.body.game, ids, callback)
                break;
            case "addcriteres":
                business.criterionAction.addCriterion(req.body, callback)
                break;
            case "addgame":
                for (var k in req.body) {
                    if (req.body[k] === "on")
                        ids.push(k)
                }
                business.gameAction.addGame({ "title": req.body.title, "shortName": req.body.shortName, "criteres": ids }, callback)
                break;
            case "editcriterion":
                business.criterionAction.updateCriterion(req.body, callback)
                break;
        }
    })
    .use(function (req, res, next) {
        res.status(404).render('404.ejs')
    })
    .listen(8080)

bot.run()