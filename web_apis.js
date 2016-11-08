/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016 by Wade Wooldridge.
 *
 *  web_apis.js - Handling the web API lookups to get the counts that correspond to the words.
 */

app.controller('ApiController', function($scope, $log, $http) {
    var self = this;
    $log.log('ApiController init');
});

/**
 *  getCountsForLibraryOfCongress - Make API calls for the Library of Congress.
 *  @param      wordPair    Array of two words to look up.
 *  @returns                Array of two counts to go with the words.
 */
function getCountsForLibraryOfCongress(wordPair) {
    console.log('getCountsForLibraryOfCongress: ' + wordPair);
    return [123, 456];
}

