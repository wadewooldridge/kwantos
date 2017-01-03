/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  dialog_controller_new_game.js - modal dialog controller for new game dialog.
 */

/**
 *  DialogControllerNewGame - modal dialog controller for new game dialog
 */
angular.module('KwantosApp').controller('DialogControllerNewGame',
    ['$scope', '$log', '$mdDialog', 'dataSent',
        function($scope, $log, $mdDialog, dataSent) {
    $log.log('DialogControllerNewGame: constructor');
    var self = this;
    this.dataSent = dataSent;
    this.dataReturned = angular.copy(dataSent);

    this.cancel = function() {
        $log.log('DialogControllerNewGame: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        $log.log('DialogControllerNewGame: confirm');
        $mdDialog.hide(this.dataReturned);
    };

}]);
