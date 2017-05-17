angular.module('myApp.guess-the-artist')
    .service('GuessTheArtistLogic', ['UtilsService','ItunesApiService', function (UtilsService, ItunesApiService) {

        var _predefinedGuessResults = [
            'Nirvana', 'Radiohead', 'Neil Young', 'Arctic Monkeys', 'Madonna', 'Britney Spears',
            'Foo Fighters', 'ABBA', 'Cat Stevens', 'Genesis', 'Muse', 'Pink Floyd',
            'Eminem', 'Kendrick Lamar', 'King Crimson', 'Alanis Morissette', 'Arcade Fire',
            'Arik Einstein', 'Beck', 'Bob Dylan'
        ];

        function _pickRandomGuessResult() {
            return _predefinedGuessResults[UtilsService.getRandomInt(0, _predefinedGuessResults.length - 1)];
        }

        var Service = {

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
                var _this = this
                _this.gameState.guessCount = 0;
                _this.gameState.guessResult = _pickRandomGuessResult();
                ItunesApiService.getAlbumsByArtist(this.gameState.guessResult).then(function(response){
                    var selectedResults = UtilsService.pickRandomValuesFromArray(response.results,_this.gameConfig.HINTS);
                    _this.gameState.hints = selectedResults.map(function(obj){
                        return {text: obj.collectionName, artworkUrl: obj.artworkUrl100}
                    });
                });
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
            getGameConfig: function () {
                return this.gameConfig;
            },
            initState: function () {
                this.initNewRound();
                this.gameState.round = 1;
                this.gameState.score = 0;
                this.gameState.gameFinished = false;

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

        return Service;
    }]);
