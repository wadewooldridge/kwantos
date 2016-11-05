/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular.
 *  Copyright (C) 2016 by Wade Wooldridge
 */

/**
 *  Angular dependencies.
 */
var app = angular.module('KwantosApp', ['ngMaterial']);
app.controller('KwantosController', function($scope, $log, $mdDialog) {
    var self = this;
    $log.log('Controller init');

    // Game parameters.
    this.playerCount = null;
    this.currentPlayerIndex = null;
    this.players = null;
    this.currentRound = null;
    this.startingScore = 5000;
    this.numberOfRounds = 10;

    // Round message display for the current round.
    this.roundMessage = 'Waiting for new game information...';
    this.displayRoundMessage = function(message) { this.roundMessage = message; };

    // Status message display at the bottom of the windows.
    this.statusMessage = '';
    this.displayStatusMessage = function(message) { this.statusMessage = message; };

    // Dialog data.
    this.dialogStatus = '';

    // Program initialization.
    this.initialize = function() {
        console.log('initialize');
        this.playerCount = 4;

        // Build the default player information.
        this.players = [];
        for (var p = 0; p < this.playerCount; p++) {
            this.players.push({
                number: p+1,
                name:   'Player ' + (p+1),
                score:  this.startingScore
            });
        }
    };

    // Click handler for help.
    this.doHelpDialog = function() {
        $log.log('doHelpDialog');
        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_help.html',
            parent: angular.element(document.body),
            openFrom: '#help-button',
            closeTo: '#help-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {dataSent: {}}
        }).then(function(response){
            self.displayStatusMessage('Help dialog OK, response: "' + response + '".');
        }, function(){
            self.displayStatusMessage('Help dialog canceled.');
        });
    };

    // Dialog handler for displaying a question and getting an answer.
    this.doQuestionDialog = function() {
        $log.log('doQuestionDialog');
    };

    // Click handler for reset game.
    this.doResetDialog = function() {
        $log.log('doResetDialog');
        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_new_game.html',
            parent: angular.element(document.body),
            openFrom: '#reset-button',
            closeTo: '#reset-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {dataSent: { playerCount: this.playerCount,
                                 players: this.players }}
        }).then(function(response){
            self.displayStatusMessage('New Game dialog OK, response: "' + response + '".');
            self.playerCount = response.playerCount;
            self.players = response.players;
            self.resetGame();
        }, function(){
            self.displayStatusMessage('New Game dialog canceled.');
        });
    };

    // Click handler for scores.
    this.doScoresDialog = function() {
        $log.log('doScoresDialog');
    };

    // Dialog handler for displaying the winner.
    this.doWinnerDialog = function() {
        $log.log('doWinnerDialog');
    };

    // Start the next round.
    this.nextRound = function() {
        this.currentRound++;
        $log.log('nextRound: ' + this.currentRound);

        if (this.currentRound <= this.numberOfRounds) {
            // Update the round div.
            this.displayRoundMessage('Round ' + this.currentRound);

            // Reset the player number and start the first player's question.
            this.currentPlayerIndex = 0;
            this.doQuestionDialog();
        } else {
            // Game is over, display winner dialog and update high scores.
            this.doWinnerDialog();
        }
    };

    // Reset game.
    this.resetGame = function() {
        console.log('resetGame');

        // Set the player scores back to the default.
        for (var p = 0; p < this.playerCount; p++) {
            this.players[p].score = this.startingScore;
        }

        // Set the round, current player, etc. back to the defaults.
        this.currentRound = 0;
        this.currentPlayerIndex = 1;

        // Go to the next round.
        this.nextRound();
    };

    // This code runs to start up the app, and put up the New Game dialog.
    this.initialize();
    this.doResetDialog();
});

/**
 *  DialogController - common controller for all program dialogs.
 */
app.controller('DialogController', function($scope, $log, $mdDialog, dataSent) {
    console.log('DialogController: constructor');
    this.dataSent = dataSent;
    this.dataReturned = angular.copy(this.dataSent);
    debugger;

    this.cancel = function() {
        console.log('cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('confirm');
        $mdDialog.hide(this.dataReturned);
    };

});

/**
 *  Document ready - initialize the rest of the program.
 */
$(document).ready(function() {
    console.log('Document ready');
});
