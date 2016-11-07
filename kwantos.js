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
    this.gameOver = true;

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

    // Build a random question and its answer.
    this.buildRandomQuestion = function() {
        return {
            itemsName:  'Books in the Library of Congress',
            answers:    ['red', 'blue'],
            counts:     [123, 456]
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
            locals: {dataSent: null, dataReturned: null }
        }).then(function(response){
            self.displayStatusMessage('Help dialog OK, response: "' + response + '".');
        }, function(){
            self.displayStatusMessage('Help dialog canceled.');
        });
    };

    // Dialog handler for displaying a question and getting an answer.
    this.doQuestionDialog = function(player, question) {
        $log.log('doQuestionDialog: ' + player.name);
        var playerElementName = '#player-' + player.number + '-div';
        var dataSent = {
            player:     player,
            question:   question
        };
        var dataReturned = {
            player:     player,
            betAmount:  Math.floor(player.score / 2),
            correct:    null
        };

        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_question.html',
            parent: '#turn-div',
            openFrom: playerElementName,
            closeTo: playerElementName,
            clickOutsideToClose: false,
            //bindToController: true,
            locals: {dataSent: dataSent, dataReturned: dataReturned }
        }).then(function(response){
            self.displayStatusMessage('Question dialog OK, response: "' + response + '".');
            self.updateScore(response);
            self.nextPlayer();
        }, function(){
            self.displayStatusMessage('Question dialog error.');
            self.gameOver = true;
        });
    };

    // Click handler for reset game.
    this.doResetDialog = function() {
        $log.log('doResetDialog');
        var dataSent = {
            playerCount:    this.playerCount,
            players:        this.players };
        var dataReturned = angular.copy(dataSent);

        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_new_game.html',
            parent: angular.element(document.body),
            openFrom: '#reset-button',
            closeTo: '#reset-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {dataSent: dataSent, dataReturned: dataReturned }
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

    // Start the next player in this round (or special handling for first player in game).
    this.nextPlayer = function() {
        console.log('nextPlayer');

        if (this.currentPlayerIndex === (this.playerCount - 1)) {
            // End of round.
            if (this.currentRound === this.numberOfRounds) {
                // End of last round = game over.
                this.doWinnerDialog();
                this.gameOver = true;
            } else {
                // End of the current round; keep going.
                this.currentRound++;
                this.displayRoundMessage('Round ' + this.currentRound);
                this.currentPlayerIndex = 0;
            }
        } else {
            // Simple update to the next player.
            this.currentPlayerIndex++;
        }

        // If we didn't finish the game, put up the next question.
        if (!this.gameOver) {
            var player = this.players[this.currentPlayerIndex];

            this.displayStatusMessage(player.name + ' is up.');
            var question = this.buildRandomQuestion();
            this.doQuestionDialog(player, question);
        }
    };

    // Reset game.
    this.resetGame = function() {
        console.log('resetGame');

        // Set the player scores back to the default.
        for (var p = 0; p < this.playerCount; p++) {
            this.players[p].score = this.startingScore;
        }

        // Set the round, current player, etc. back to the defaults, to trigger first round / first player.
        this.currentRound = 0;
        this.currentPlayerIndex = this.playerCount - 1;
        this.gameOver = false;

        // Go to the next player / round.
        this.nextPlayer();
    };

    // Update score based on data returned from question dialog.
    this.updateScore = function(response) {
        $log.log('updateScore: Player ' + response.player.number + ', ' +
            (response.correct ? '+' : '-') + response.betAmount);
        if (response.correct) {
            response.player.score += response.betAmount;
        } else {
            response.player.score -= response.betAmount;
        }
    };

    // This code runs to start up the app, and put up the New Game dialog.
    this.initialize();
    this.doResetDialog();
});

/**
 *  DialogController - common controller for all program dialogs.
 */
app.controller('DialogController', function($scope, $log, $mdDialog, dataSent, dataReturned) {
    console.log('DialogController: constructor');
    var self = this;
    this.dataSent = dataSent;
    this.dataReturned = dataReturned;

    // Special handling for the question dialog.
    this.answerChosen = false;
    this.answerClicked = function(leftAnswerChosen) {
        $log.log('answerClicked: ' + (leftAnswerChosen ? 'left' : 'right'));
        self.answerChosen = true;
        var leftAnswerIsCorrect = (self.dataSent.question.counts[0] > self.dataSent.question.counts[1]);
        this.dataReturned.correct = (leftAnswerChosen === leftAnswerIsCorrect);
    };

    //debugger;

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
