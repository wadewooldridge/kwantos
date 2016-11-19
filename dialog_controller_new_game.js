/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  dialog_controller_new_game.js - modal dialog controller for new game dialog.
 */

/**
 *  Angular dependencies.
 */
/**
 *  DialogControllerNewGame - modal dialog controller for new game dialog
 */
angular.module('KwantosApp').controller('DialogControllerNewGame', ['$scope', '$log', '$mdDialog', 'dataSent', 'dataReturned',
    function($scope, $log, $mdDialog, dataSent, dataReturned) {
    $log.log('DialogControllerNewGame: constructor');
    var self = this;
    this.dataSent = dataSent;
    this.dataReturned = dataReturned;

    this.cancel = function() {
        console.log('DialogControllerNewGame: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('DialogControllerNewGame: confirm');
        $mdDialog.hide(this.dataReturned);
    };

}]);
