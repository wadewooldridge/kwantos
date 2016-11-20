/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  dialog_controller_question.js - modal dialog controller for main question dialog.
 */

/**
 *  Angular dependencies.
 */
/**
 *  DialogController - modal dialog controller for main question dialog.
 */
angular.module('KwantosApp').controller('DialogControllerQuestion', ['$scope', '$log', '$mdDialog', 'dataSent', 'dataReturned', function($scope, $log, $mdDialog, dataSent, dataReturned) {
    $log.log('DialogControllerQuestion: constructor');
    var self = this;
    this.dataSent = dataSent;
    this.player = dataSent.player;
    this.question = dataSent.question;
    this.dataReturned = dataReturned;
    this.rightOrWrong = '';

    // Special handling for the question dialog.
    this.answerChosen = false;
    this.answerClicked = function(leftAnswerChosen) {
        $log.log('answerClicked: ' + (leftAnswerChosen ? 'left' : 'right'));
        self.answerChosen = true;
        var leftAnswerIsCorrect = (self.question.answers[0].count > self.question.answers[1].count);
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
        console.log('DialogControllerQuestion: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('DialogControllerQuestion: confirm');
        $mdDialog.hide(this.dataReturned);
    };

}]);
