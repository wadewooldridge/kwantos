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
    this.dataSent = dataSent;
    this.dataReturned = dataReturned;
    this.rightOrWrong = '';

    // Special handling for the question dialog.
    this.answerChosen = false;
    this.answerClicked = function(leftAnswerChosen) {
        $log.log('answerClicked: ' + (leftAnswerChosen ? 'left' : 'right'));
        self.answerChosen = true;
        var leftAnswerIsCorrect = (self.dataSent.question.counts[0] > self.dataSent.question.counts[1]);
        this.dataReturned.correct = (leftAnswerChosen === leftAnswerIsCorrect);

        // This was better done with ng-show and ng-hide, but flickered the two answers due to overlapped animations.
        if (self.dataReturned.correct) {
            self.rightOrWrong = "That is correct!";
            $('#right-or-wrong').removeClass('wrong-answer').addClass('correct-answer');
        } else {
            self.rightOrWrong = "Sorry, that is incorrect.";
            $('#right-or-wrong').removeClass('correct-answer').addClass('wrong-answer');
        }
    };

    this.cancel = function() {
        console.log('cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('confirm');
        $mdDialog.hide(this.dataReturned);
    };

}]);
