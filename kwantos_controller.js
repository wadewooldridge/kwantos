/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  kwantos_controller.js - Main game processing.
 */

/**
 *  Angular dependencies.
 */
angular.module('KwantosApp').controller('KwantosController', ['$scope', '$log', '$mdDialog', 'QuestionService', function($scope, $log, $mdDialog, QuestionService) {
    var self = this;
    $log.log('KwantosController: constructor');

    // Game parameters.
    this.playerCount = null;
    this.players = null;

    this.currentRound = null;
    this.currentPlayerIndex = null;
    this.currentPlayer = null;
    this.currentBetAmount = null;

    this.startingScore = 5000;
    this.numberOfRounds = 10;
    this.gameOver = true;

    // Status for the current question in progress.
    this.question = null;
    this.answerChosen = false;
    this.rightOrWrong = '';

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
                index:  p,
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
            controller: 'DialogControllerHelp',
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

    // Click handler for new game.
    this.doNewGameDialog = function() {
        $log.log('doNewGameDialog');
        var dataSent = {
            playerCount:    this.playerCount,
            players:        this.players
        };

        $mdDialog.show({
            controller: 'DialogControllerNewGame',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_new_game.html',
            parent: angular.element(document.body),
            openFrom: '#reset-button',
            closeTo: '#reset-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {dataSent: dataSent }
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
                this.processWinner();
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
        this.currentPlayer = this.players[this.currentPlayerIndex];

        // If we didn't finish the game, put up the next question.
        if (!this.gameOver) {
            var player = this.players[this.currentPlayerIndex];
            this.displayStatusMessage(player.name + ' is up.');
            this.currentBetAmount = Math.max(Math.floor(player.score / 2), 100);
            this.answerChosen = false;

            QuestionService.buildRandomQuestion().then(
                function onSuccess(response) {
                    console.log('buildRandomQuestion: success');
                    self.question = QuestionService.currentQuestion;

                },
                function onFailure(response) {
                    console.log('buildRandomQuestion: failure: ' + response);
                    self.displayStatusMessage('Failed to load question: ' + response);
                    self.gameOver = true;
                }
            );
        }
    };

    // Handle the user clicking on either answer.
    this.answerClicked = function(leftAnswerChosen) {
        $log.log('answerClicked: ' + (leftAnswerChosen ? 'left' : 'right'));
        self.answerChosen = true;
        var leftAnswerIsCorrect = (self.question.answers[0].count > self.question.answers[1].count);
        var correctAnswerChosen = (leftAnswerChosen === leftAnswerIsCorrect);

        // This was better done with ng-show and ng-hide, but flickered the two answers due to overlapped animations.
        if (correctAnswerChosen) {
            self.rightOrWrong = "That is correct!";
            $('#right-or-wrong').removeClass('wrong-answer').addClass('correct-answer');
        } else {
            self.rightOrWrong = "Sorry, that is incorrect.";
            $('#right-or-wrong').removeClass('correct-answer').addClass('wrong-answer');
        }

        // Update the score, then wait for the user to confirm/dismiss the current question.
        self.updateScore(correctAnswerChosen);
        self.displayStatusMessage('Hit confirm to move to the next player.');
    };

    // Handle the dismiss button for the current question.
    this.confirmQuestion = function() {
        $log.log('confirmQuestion');
        this.nextPlayer();
    };

    // Process the winner and then put up the scores.
    this.processWinner = function() {
        console.log('processWinner');

        this.doWinnerDialog();
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
    this.updateScore = function(correct) {
        $log.log('updateScore: ' + correct);
        if (correct) {
            this.currentPlayer.score += this.currentBetAmount;
        } else {
            this.currentPlayer.score -= this.currentBetAmount;
        }
    };

    // This code runs to start up the app, and put up the New Game dialog.
    this.initialize();
    this.doNewGameDialog();
}]);

