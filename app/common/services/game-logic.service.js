/**
 * Created by yotam on 17/05/2017.
 */
/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('GameLogicService', [ function () {
        var _logicManager;
        var Service = {
            
            initLogic: function(logic){
                _logicManager = logic
            },

            initGame: function () {
                _logicManager.initState();
            },

            getGameState: function () {
                return _logicManager.getState();
            },

            getGameConfig: function(){
                return _logicManager.getGameConfig();
            },

            getGameInteractions: function () {
                return _logicManager.USER_INTERACTIONS;
            },

            updateGameState: function (interaction) {
                _logicManager.updateState(interaction);
                return _logicManager.getState();
            },
            
            restart: function(){
                _logicManager.initState();
            },
            
        };

        return Service;
    }]);
