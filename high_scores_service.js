/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  high_scores_service.js - data service to read and update the high score list in local storage.
 */

angular.module('KwantosApp').service('HighScoresService', ['$http', '$log', function($http, $log) {
    $log.log('HighScoresService: factory');

    /**
     *  LOCAL_STORAGE_KEY - Identifier to look up in local storage.
     *  @type   string
     */
    this.LOCAL_STORAGE_KEY = 'KwantosHighScores';

    /**
     *  MAX_SCORES - Max number of high scores to store in local storage.
     *  @type   int
     */
    this.MAX_SCORES = 10;

    /**
     *  isLocalStorageSupported - returns true if browser supports localStorage functions.
     *  @returns {boolean} - true if supported.
     */
    this.isLocalStorageSupported = function() {
        return typeof(localStorage) !== 'undefined';
    };

    /**
     *  read - read high scores from local storage and return the array.
     *  @returns {object[]}
     */
    this.read = function() {
        $log.log('HighScoresService: read');
        var retArray = null;

        if (!this.isLocalStorageSupported()) {
            $log.warn('localStorage not supported - no high scores');
        } else {
            retArray = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
        }

        return retArray;
    };

    /**
     *  update - update high scores in local storage based on the scores of the current game.
     *  @param {object[]} players - Array of player objects.
     */
    this.update = function(players) {
        $log.log('HighScoresService: update');

        if (!this.isLocalStorageSupported()) {
            $log.warn('localStorage not supported - no high scores');
        } else {
            var highScores = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
            // If local storage was empty, it returns null; set it as an empty array instead.
            if (highScores === null) {
                highScores = [];
            }

            // Process each player in turn from the players array passed in.
            for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
                var player = players[playerIndex];
                var name = player.name;
                var score = player.score;
                var playerObj = {name: name, score: score};
                var inserted = false;

                // Walk the scores and insert this player object.
                for (var highScoresIndex = 0; highScoresIndex < highScores.length; highScoresIndex++) {
                    if (score > highScores[highScoresIndex].score) {
                        highScores.splice(highScoresIndex, 0, playerObj);
                        inserted = true;
                        break;
                    }
                }

                // If we reached the end of the array, append this player object.
                if (!inserted) {
                    highScores.push(playerObj);
                }
            }

            // Truncate the array if it got too long.
            if (highScores.length >= this.MAX_SCORES) {
                highScores = highScores.slice(0, this.MAX_SCORES);
            }

            // Now save the updated array back to local storage.
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(highScores));
        }

    };
}]);
