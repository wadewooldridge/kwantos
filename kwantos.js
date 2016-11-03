/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular.
 *  Copyright (C) 2016 by Wade Wooldridge
 */

/**
 *  Angular dependencies.
 */
var app = angular.module('KwantosApp', ['ngMaterial']);
app.controller('KwantosController', function($scope, $log){
    $log.log('Controller init');
});

/**
 *  Document ready - initialize the rest of the program.
 */
$(document).ready(function() {
    console.log('Document ready');
});
