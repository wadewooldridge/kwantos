/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  question_service.js - data service to build questions and get the answers from web APIs.
 */

angular.module('KwantosApp').service('QuestionService', ['$http', '$log', '$q', function($http, $log, $q) {
    //$log.log('QuestionService: factory');

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
        //$log.log('resetCurrentQuestion');
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
        //$log.log('buildRandomQuestion');
        this.resetCurrentQuestion();
        var words = getRandomWordPair();
        // Randomize which word comes first when presented.
        if (Math.random() > 0.5) {
            this.currentQuestion.answers[0].word = words[0];
            this.currentQuestion.answers[1].word = words[1];
        } else {
            this.currentQuestion.answers[0].word = words[1];
            this.currentQuestion.answers[1].word = words[0];
        }

        //$log.log('buildRandomQuestion: words: ' + this.currentQuestion.answers[0].word + ', ' + this.currentQuestion.answers[1].word);

        // Select a random API from the array of APIs, and save its parameters.
        var api = this.apis[Math.floor(Math.random() * this.apis.length)];
        this.currentCountFunction = api.countFunction;
        this.currentQuestion.itemsName = api.itemsName;

        // Get the count for both words.
        var defer =  $q.defer();

        $q.all([
            this.currentCountFunction(this.currentQuestion.answers[0]),
            this.currentCountFunction(this.currentQuestion.answers[1])
        ])
            .then(function onSuccess(results) {
                //$log.log('Get count success: ' + results);
                defer.resolve();
            },
            function onFailure(response) {
                //$log.log('Get count failure: ' + response);
                defer.reject('HTTP request failed.');
            }
        );

        return defer.promise;
    };

    /**
     *  getCountsForFlickr - Make API calls for Flickr.
     *  @param wordObject {object}  Word object to look up.
     *  @returns {object}           Promise for the web search.
     */
    this.getCountsForFlickr = function(wordObject) {
        //$log.log('getCountsForFlickr: "' + wordObject.word + '"');
        var urlBase = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
        var urlMiddle = '&api_key=' + 'ae2be88898748811d752637d4c7235c5' + '&text=';
        var urlEnd = '&media=photos&format=json&nojsoncallback=1';
        var url = urlBase + urlMiddle + wordObject.word + urlEnd;
        //$log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'get'
        }).success(function(response) {
            var count = parseInt(response.photos.total);
            //$log.log('getCountsForFlickr: success, count=' + count);
            wordObject.count = count;
            defer.resolve(count);
        }).error(function(response) {
            //$log.log('getCountsForFlickr: failure: ' + response);
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    /**
     *  getCountsForGeoNames - Make API calls for GeoNames.
     *  @param wordObject {object}  Word object to look up.
     *  @returns {object}           Promise for the web search.
     */
    this.getCountsForGeoNames = function(wordObject) {
        //$log.log('getCountsForGeoNames: "' + wordObject.word + '"');
        var urlBase = 'http://api.geonames.org/searchJSON?name=';
        var urlEnd = '&username=kwantos&maxRows=1&callback=JSON_CALLBACK';
        var url = urlBase + wordObject.word + urlEnd;
        //$log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'jsonp'
        }).success(function(response) {
            var count = response.totalResultsCount;
            //$log.log('getCountsForGeoNames: success, count=' + count);
            wordObject.count = count;
            defer.resolve(count);
        }).error(function(response) {
            //$log.log('getCountsForGeoNames: failure: ' + response);
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    /**
     *  getCountsForGoogleBooks - Make API calls for GoogleBooks.
     *  @param wordObject {object}  Word object to look up.
     *  @returns {object}           Promise for the web search.
     */
    this.getCountsForGoogleBooks = function(wordObject) {
        //$log.log('getCountsForGoogleBooks: "' + wordObject.word + '"');
        var urlBase = 'https://www.googleapis.com/books/v1/volumes?q=';
        var url = urlBase + wordObject.word;
        //$log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'get'
        }).success(function(response) {
            var count = response.totalItems;
            //$log.log('getCountsForGoogleBooks: success, count=' + count);
            wordObject.count = count;
            defer.resolve(count);
        }).error(function(response) {
            //$log.log('getCountsForGoogleBooks: failure: ' + response);
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    /**
     *  getCountsForYouTube - Make API calls for YouTube.
     *                        Note that we have to limit to US videos in the last 24 hours,
     *                        to keep from having every result cap out at 1,000,000.
     *  @param wordObject {object}  Word object to look up.
     *  @returns {object}           Promise for the web search.
     */
    this.getCountsForYouTube = function(wordObject) {
        var oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        var dateString = oneDayAgo.toISOString();
        //$log.log('getCountsForYouTube: "' + wordObject.word + '"');
        var urlBase = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDWyFJriCis4foVHHv1kxnn73aGpp4taQ4';
        var urlEnd = '&part=snippet&type=video&regionCode=US&publishedAfter=' + dateString;
        var url = urlBase + urlEnd + '&q=' + wordObject.word;
        //$log.log('url: ' + url);

        var defer = $q.defer();

        $http({
            url:        url,
            method:     'get'
        }).success(function(response) {
            var count = response.pageInfo.totalResults;
            //$log.log('getCountsForYouTube: success, count=' + count);
            wordObject.count = count;
            defer.resolve(count);
        }).error(function(response) {
            //$log.log('getCountsForYouTube: failure: ' + response);
            defer.reject('HTTP request failed.');
        });

        return defer.promise;
    };

    // Build the list of APIs (has to occur after their definitions.
    this.apis = [
        {
            countFunction: this.getCountsForFlickr,
            itemsName: 'Flickr photo tags'
        },
        {
            countFunction: this.getCountsForGeoNames,
            itemsName: 'GeoNames place names'
        },
        {
            countFunction: this.getCountsForGoogleBooks,
            itemsName: 'Google Books API volumes'
        },
        {
            countFunction: this.getCountsForYouTube,
            itemsName: 'US YouTube videos in the last 24 hours'
        }
    ];


}]);


