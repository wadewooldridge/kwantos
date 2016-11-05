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
    this.players = [];
    this.startingScore = 5000;

    // Dialog data.
    this.dialogStatus = '';

    // Program initialization.
    this.initialize = function() {
        console.log('initialize');
        this.playerCount = 4;
    };

    // Click handler for help.
    this.help = function() {
        $log.log('help');
        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_help.html',
            parent: angular.element(document.body),
            openFrom: '#help-button',
            closeTo: '#help-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {testName: 'testValue'}
        }).then(function(response){
            self.dialogStatus = 'Help dialog OK, response: "' + response + '".';
        }, function(){
            self.dialogStatus = 'Help dialog canceled.';
        });
    };

    // Click handler for reset game.
    this.reset = function() {
        $log.log('reset');
        $mdDialog.show({
            controller: 'DialogController',
            controllerAs: 'dc',
            templateUrl: 'dialog_template_new_game.html',
            parent: angular.element(document.body),
            openFrom: '#reset-button',
            closeTo: '#reset-button',
            clickOutsideToClose: true,
            //bindToController: true,
            locals: {testName: 'testValue'}
        }).then(function(response){
            self.dialogStatus = 'New Game dialog OK, response: "' + response + '".';
        }, function(){
            self.dialogStatus = 'New Game dialog canceled.';
        });
    };

    // Click handler for scores.
    this.scores = function() {
        $log.log('scores');
    };

    // Reset game.
    this.resetGame = function() {
        console.log('resetGame');

        // Build the players based on playerCount.
        this.players = [];
        for (var p = 0; p < this.playerCount; p++) {
            this.players.push({
                name:   'Player ' + (p+1),
                score:  this.startingScore
            });
        }
    };

    // This code runs to start up the app.
    this.initialize();
    this.resetGame();
});

/**
 *  DialogController - common controller for all program dialogs.
 */
app.controller('DialogController', function($scope, $log, $mdDialog, testName) {
    console.log('DialogController: constructor');
    this.testName = testName;

    this.cancel = function() {
        console.log('cancel');
        $mdDialog.hide();
    };

    this.confirm = function() {
        console.log('confirm');
        $mdDialog.hide();
    };

});

/**
 *  Document ready - initialize the rest of the program.
 */
$(document).ready(function() {
    console.log('Document ready');
});
