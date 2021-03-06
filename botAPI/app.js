const express = require('express')
const bodyParser = require('body-parser')
const Business = require('./modules/business/main')
const Bot = require('./modules/bot/Bot')
var cors = require('cors')
var app = express()

var business = new Business()
var bot = new Bot(business)

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors(corsOptions))

    //GAMES
    .get('/game/list', function (req, res) {
        business.gameQuery.getGamesList(function (data) {
            res.end(JSON.stringify(data));
        });
    })
    .get('/game/:gameId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {

            business.gameQuery.getGameById(req.params.gameId, function (game) {
                // var url = game[0].title.replace(/ /gi, "%20")
                business.gameQuery.getGameStats(req.params.gameId, function (stats) {
                    res.end(JSON.stringify({ title: game[0].title, id: req.params.gameId, ended: (game[0].statusEnd==1), gameStats: stats}));
                });
            });
        }
        else
            res.status(404);
    })
    .post('/game', function (req, res) {
        business.gameAction.addGame(req.body, function (msg) {
            res.end(JSON.stringify(msg));
        })
    })
    .delete('/game/:gameId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {
            business.gameAction.deleteGame(req.params.gameId, function (msg) {
                res.end(JSON.stringify(msg));
            });
        }
        else
            res.status(404);
    })
    .get('/game/:gameId/criterions', function(req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {
            business.gameQuery.getGamesCriterions(req.params.gameId, function (rows) {
                res.end(JSON.stringify(rows));
            })
        }
        else
            res.status(404);
    })
    .post('/game/:gameId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {
            business.gameAction.updateGame(req.body, function (msg) {
                res.end(JSON.stringify(msg));
            })
        }
        else
            res.status(404);
    })
    .post('/game/:gameId/status', function(req, res){
        //Si un paramètre a été fourni
        if (req.params.gameId.length > 0) {
            business.gameAction.updateGameState(req.params.gameId, req.body.status, function (msg) {
                res.end(JSON.stringify(msg));
            })
        }
        else
            res.status(404);
    })

    //CRITERIONS
    .get('/criterion/list', function (req, res) {
        business.criterionQuery.getCriterionsList(function (data) {
            res.end(JSON.stringify(data));
        });
    })
    .get('/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionQuery.getCriterionById(req.params.criterionId, function (criterion) {
                res.end(JSON.stringify(criterion));
            });
        }
        else
            res.status(404);
    })
    .post('/criterion', function (req, res) {
        if (req.body) {
            business.criterionAction.addCriterion(req.body, function (msg) {
                res.end(JSON.stringify(msg));
            })
        }
        else
            res.end(JSON.stringify({ msg: "415 : no object provided" }));
    })
    .post('/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionAction.updateCriterion(req.body, function (msg) {
                res.end(JSON.stringify(msg));
            })
        }
        else
            res.status(404);
    })
    .delete('/criterion/:criterionId', function (req, res) {
        //Si un paramètre a été fourni
        if (req.params.criterionId.length > 0) {
            business.criterionAction.deleteCriterion(req.params.criterionId, function (msg) {
                res.end(JSON.stringify(msg));
            })
        }
        else
            res.status(404);
    })


    .use(function (req, res, next) {
        res.status(404).end(JSON.stringify({ msg: "404 not found" }));
    })
    .listen(8080)

bot.run()