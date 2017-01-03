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
angular.module('KwantosApp').controller('DialogControllerHelp',
    ['$scope', '$log', '$mdDialog',
        function($scope, $log, $mdDialog) {
    $log.log('DialogControllerHelp: constructor');
    var self = this;

    this.cancel = function() {
        $log.log('DialogControllerHelp: cancel');
        $mdDialog.cancel();
    };

    this.confirm = function() {
        $log.log('DialogControllerHelp: confirm');
        $mdDialog.hide();
    };

}]);
