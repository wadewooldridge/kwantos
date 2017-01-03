/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
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
        answers: [
            {word: 'TBD', count: 0},
            {word: 'TBD', count: 0}
        ]
    };

    /**
     *  resetCurrentQuestion - reset fields in currentQuestion object in preparation for the next question.
     */
    this.resetCurrentQuestion = function() {
        $log.log('resetCurrentQuestion');
        this.currentQuestion.countFunction = null;
        this.currentQuestion.itemsName = 'TBD';
        for (var i = 0; i < 2; i++) {
            this.currentQuestion.answers[i].word = 'TBD';
            this.currentQuestion.answers[i].count = 0;
        }
    };

    /**
     *  buildRandomQuestion - main interface to build up the parts of a random question for the controller.
     *  @returns {object} - Promise.
     */
    this.buildRandomQuestion = function() {
        $log.log('buildRandomQuestion');
        this.resetCurrentQuestion();
        var words = getRandomWordPair();
        this.currentQuestion.answers[0].word = words[0];
        this.currentQuestion.answers[1].word = words[1];

        $log.log('buildRandomQuestion: words: ' + this.currentQuestion.answers[0].word + ', ' +
                                                  this.currentQuestion.answers[1].word);

        // TODO: Randomly select the type of lookup.
        this.currentCountFunction = this.getCountsForGeoNames;
        this.currentQuestion.itemsName = 'place names in the world';

        // Get the count for both words.
        return $q.all([
            this.currentCountFunction(this.currentQuestion.answers[0]),
            this.currentCountFunction(this.currentQuestion.answers[1])
        ])
            .then(function onSuccess(results) {
                $log.log('Get count success: ' + results);
            },
            function onFailure(response) {
                $log.log('Get count failure: ' + response);
            }
        );

    };

    /**
     *  getCountsForGeoNames - Make API calls for GeoNames.
     *  @param wordObject {object}  Word object to look up.
     *  @returns {object}           Promise for the web search.
     */
    this.getCountsForGeoNames = function(wordObject) {
        $log.log('getCountsForGeoNames: "' + wordObject.word + '"');
        var urlBase = 'http://api.geonames.org/searchJSON?name=';
        var urlEnd = '&username=kwantos&maxRows=1&callback=JSON_CALLBACK';
        var url = urlBase + wordObject.word + urlEnd;
        $log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'jsonp'
        }).success(function(response) {
            var count = response.totalResultsCount;
            $log.log('getCountsForGeoNames: success, count=' + count);
            wordObject.count = count;
            defer.resolve(count);
        }).error(function(response) {
            $log.log('getCountsForGeoNames: failure: ' + response);
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


