/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  dialog_controller_high_scores.js - modal dialog controller for high scores dialog.
 */

/**
 *  DialogControllerHighScores - modal dialog controller for high scores dialog.
 */
angular.module('KwantosApp').controller('DialogControllerHighScores',
    ['$scope', '$log', '$mdDialog', 'HighScoresService',
        function($scope, $log, $mdDialog, HighScoresService) {
    //$log.log('DialogControllerHighScores: constructor');
    this.highScores = HighScoresService.read();
    this.cardinals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

    this.cancel = function() {
        //$log.log('DialogControllerHighScores: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        //$log.log('DialogControllerHighScores: confirm');
        $mdDialog.hide();
    };

}]);
