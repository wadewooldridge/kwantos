/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  dialog_controller_winners.js - modal dialog controller for winners dialog.
 */

/**
 *  DialogControllerWinners - modal dialog controller for winners dialog.
 */
angular.module('KwantosApp').controller('DialogControllerWinners',
    ['$scope', '$log', '$mdDialog', 'HighScoresService', 'winners',
        function($scope, $log, $mdDialog, HighScoresService, winners) {
    $log.log('DialogControllerWinners: constructor');
    this.winners = winners;
    this.highScores = HighScoresService.read();
    this.cardinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

    this.cancel = function() {
        console.log('DialogControllerWinners: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('DialogControllerWinners: confirm');
        $mdDialog.hide();
    };

}]);
