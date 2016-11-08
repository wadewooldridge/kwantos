/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  question_service.js - data service to build questions and get the answers from web APIs.
 */

// Trying this as a service.
angular.module('KwantosApp').service('QuestionService', ['$http', '$log', function($http, $log) {
    $log.log('QuestionService: factory');

    // Build a random question and its answer.
    this.buildRandomQuestion = function() {
        var wordPair = getRandomWordPair();
        var counts = this.getCountsForLibraryOfCongress(wordPair);
        return {
            itemsName:  'Books in the Library of Congress',
            answers:    wordPair,
            counts:     counts
        }
    };

    /**
     *  getCountsForLibraryOfCongress - Make API calls for the Library of Congress.
     *  @param      wordPair    Array of two words to look up.
     *  @returns                Array of two counts to go with the words.
     */
    this.getCountsForLibraryOfCongress = function(wordPair) {
        console.log('getCountsForLibraryOfCongress: ' + wordPair);
        return [123, 456];
    }

}]);


