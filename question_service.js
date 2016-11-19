/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  question_service.js - data service to build questions and get the answers from web APIs.
 */

angular.module('KwantosApp').service('QuestionService', ['$http', '$log', '$q', function($http, $log, $q) {
    $log.log('QuestionService: factory');

    /**
     *  currentQuestion - object to hold all the parts of the current question and answers.
     *  @type {null}
     */
    this.currentQuestion = {
        countFunction: null,
        itemsName: 'TBD',
        answers: ['TBD', 'TBD'],
        counts: [0, 0]
    };

    /**
     *  resetCurrentQuestion - reset fields in currentQuestion object in preparation for the next question.
     */
    this.resetCurrentQuestion = function() {
        $log.log('resetCurrentQuestion');
        this.currentQuestion.countFunction = null;
        this.currentQuestion.itemsName = 'TBD';
        this.currentQuestion.answers = ['TBD', 'TBD'];
        this.currentQuestion.counts = [0, 0];
    };

    /**
     *  buildRandomQuestion - main interface to build up the parts of a random question for the controller.
     *  @returns {object} - Promise.
     */
    this.buildRandomQuestion = function() {
        $log.log('buildRandomQuestion');
        this.resetCurrentQuestion();
        this.currentQuestion.answers = getRandomWordPair();
        $log.log('buildRandomQuestion: words: ' + this.currentQuestion.answers);

        // TODO: Randomly select the type of lookup.
        this.currentCountFunction = this.getCountsForGeoNames;
        this.currentQuestion.itemsName = 'place names in the world';

        // Get the count for the first word.
        return this.currentCountFunction(this.currentQuestion.answers[0])
            .then(function onSuccess(response) {
                $log.log('Get count success: ' + response);
                self.currentQuestion.counts[0] = response;
            },
            function onFailure(response) {
                $log.log('Get count failure: ' + response);
            }
        );

    };

    /**
     *  getCountsForGeoNames - Make API calls for GeoNames.
     *  @param      word        Word to look up.
     *  @returns                Count for this word.
     */
    this.getCountsForGeoNames = function(word) {
        $log.log('getCountsForGeoNames: "' + word + '"');
        var urlBase = 'http://api.geonames.org/searchJSON?name=';
        var urlEnd = '&username=kwantos&maxRows=1&callback=JSON_CALLBACK';
        var url = urlBase + word + urlEnd;
        $log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'jsonp'
        }).success(function(response) {
            $log.log('getCountsForGeoNames: success, count=' + response.totalResultsCount);
            debugger;
            defer.resolve(response.totalResultsCount);
        }).error(function(response) {
            $log.log('getCountsForGeoNames: failure: ' + response);
            debugger;
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    /**
     *  getCountsForITunes - Make API calls for iTunes.
     *  @param      word        Word to look up.
     *  @returns                Count for this word.
     */
    this.getCountsForITunes = function(word) {
        $log.log('getCountsForITunes: "' + word + '"');
        var urlBase = 'https://itunes.apple.com/search?term=';
        var urlEnd = '&callback=JSON_CALLBACK';
        var defer = $q.defer();

        $http({
            url:        urlBase + word + urlEnd,
            method:     'jsonp'
        }).success(function(response) {
            $log.log('getCountsForITunes: success');
            debugger;
            defer.resolve(response);
        }).error(function() {
            $log.log('getCountsForITunes: failure');
            debugger;
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    /**
     *  getCountsForLibraryOfCongress - Make API calls for the Library of Congress.
     *  @param      wordPair    Array of two words to look up.
     *  @returns                Array of two counts to go with the words.
     */
    this.getCountsForLibraryOfCongress = function(wordPair) {
        console.log('getCountsForLibraryOfCongress: ' + wordPair);
        return [123, 456];
    };

}]);


