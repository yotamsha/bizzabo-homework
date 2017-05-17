angular.module('myApp.guess-the-artist')
    .service('GuessTheArtistLogic', ['UtilsService', function (UtilsService) {
        var _predefinedGuessResults = [
            'Nirvana', 'Radiohead', 'Neil Young', 'Arctic Monkeys', 'Madonna', 'Britney Spears',
            'Foo Fighters', 'ABBA', 'Cat Stevens', 'Genesis', 'Muse', 'Pink Floyd',
            'Eminem', 'Kendrick Lamar', 'King Crimson', 'Alanis Morissette', 'Arcade Fire',
            'Arik Einstein', 'Beck', 'Bob Dylan'
        ];

        var _apiProvider = '';

        function _pickRandomGuessResult() {
            return _predefinedGuessResults[UtilsService.getRandomInt(0, _predefinedGuessResults.length - 1)];
        }

        var _gameState = {
            initialized: false
        };
        var guessTheArtistLogic = {

            gameConfig: {
                ROUNDS: 5,
                HINTS: 3,
                SCORE_RULES: {
                    0: 5,
                    1: 3,
                    2: 1
                }
            },

            gameState: {},
            USER_INTERACTIONS: {
                GUESS: "GUESS"
            },

            checkGuess: function (guess) {
                if (guess.toLowerCase() === this.gameState.guessResult.toLowerCase()) {
                    return true;
                }
                return false;
            },
            initNewRound: function () {
                this.gameState.guessCount = 0;
                this.gameState.guessResult = _pickRandomGuessResult();
                this.gameState.hints = [{text: "abc abcd abcde !"}, {text: "abc abcd abcde !"}, {text: "abc abcd abcde !"}];
            },
            updateRound: function () {
                if (this.gameState.round === this.gameConfig.ROUNDS) {
                    this.gameState.gameFinished = true;
                } else {
                    this.gameState.round++;
                    this.initNewRound();
                }

            },

            updateScore: function () {
                this.gameState.score += this.gameConfig.SCORE_RULES[this.gameState.guessCount]
            },
            getState: function () {
                return this.gameState
            },
            initState: function () {
                this.initNewRound();
                this.gameState.round = 1;
                this.gameState.score = 0;
            },

            updateState: function (interactionData) {
                switch (interactionData.interactionType) {
                    case this.USER_INTERACTIONS.GUESS:
                        if (this.checkGuess(interactionData.value)) { // is guess correct?
                            this.updateScore();
                            this.updateRound();
                        } else {
                            if (this.gameState.guessCount === (this.gameConfig.HINTS - 1)) { // is last guess?
                                this.updateRound();
                            } else {
                                this.gameState.guessCount++;
                            }
                        }
                        break;
                }
            }
        };

        var _logicManager = guessTheArtistLogic;

        var Service = {

            /*            _getPredefinedGuessResults: function () {
             return _predefinedGuessResults;
             },
             getGameConfig: function () {
             return _logicManager.gameConfig;
             },*/
            initGame: function () {
                _logicManager.initState();
                //_gameState.initialized = true;
            },

            getGameState: function () {
                return _logicManager.getState();
            },

            getGameInteractions: function () {
                return _logicManager.USER_INTERACTIONS;
            },

            updateGameState: function (interaction) {
                _logicManager.updateState(interaction);
                return _logicManager.getState();
            }


        };

        return Service;
    }]);
