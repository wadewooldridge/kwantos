/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  dialog_controller.js - Main processing of the game modal dialogs.
 */

/**
 *  Angular dependencies.
 */
/**
 *  DialogController - common controller for all program dialogs.
 */
angular.module('KwantosApp').controller('DialogController', ['$scope', '$log', '$mdDialog', 'dataSent', 'dataReturned',
    function($scope, $log, $mdDialog, dataSent, dataReturned) {
    $log.log('DialogController: constructor');
    var self = this;
    debugger;
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

}]);
