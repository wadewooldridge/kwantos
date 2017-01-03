/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  dialog_controller_help.js - modal dialog controller for help dialog.
 */

/**
 *  DialogControllerHelp - modal dialog controller for help dialog.
 */
angular.module('KwantosApp').controller('DialogControllerHelp', ['$scope', '$log', '$mdDialog', 'dataSent', 'dataReturned', function($scope, $log, $mdDialog, dataSent, dataReturned) {
    $log.log('DialogControllerHelp: constructor');
    var self = this;
    this.dataSent = dataSent;
    this.dataReturned = dataReturned;

    this.cancel = function() {
        console.log('DialogControllerHelp: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        console.log('DialogControllerHelp: confirm');
        $mdDialog.hide(this.dataReturned);
    };

}]);
