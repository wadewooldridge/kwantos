/**
 *  Kwantos (how many) game.
 *  An exercise in web API usage with Angular Materials and web APIs.
 *  Copyright (C) 2016-2017 by Wade Wooldridge.
 *
 *  word_pairs.js - The pairs of words that are used in the game play.
 */

/**
 *  getRandomWordPair - Get a random pair of words from the main list.
 *  @returns    Array of two words.
 */
function getRandomWordPair() {
    //console.log('getRandomWordPair');
    return gaWordPairs[Math.floor(Math.random() * gaWordPairs.length)];
}

/**
 *  gaWordPairs - Main data set for game play.
 *  @type       string[][]
 */
var gaWordPairs = [
    ['adventure', 'journey'],
    ['africa', 'europe'],
    ['airplane', 'rocket'],
    ['angel', 'devil'],
    ['angels', 'dodgers'],
    ['asteroid', 'comet'],
    ['attract', 'repel'],
    ['basketball', 'football'],
    ['bear', 'deer'],
    ['bed', 'couch'],
    ['bee', 'bird'],
    ['better', 'worse'],
    ['big', 'little'],
    ['blues', 'jazz'],
    ['black', 'blue'],
    ['black', 'white'],
    ['blouse', 'shirt'],
    ['blue', 'red'],
    ['boat', 'plane'],
    ['born', 'died'],
    ['bowl', 'plate'],
    ['boy', 'girl'],
    ['boys', 'girls'],
    ['bra', 'panties'],
    ['brother', 'sister'],
    ['camelot', 'spamalot'],
    ['car', 'truck'],
    ['cat', 'dog'],
    ['chair', 'table'],
    ['child', 'parent'],
    ['china', 'japan'],
    ['church', 'hospital'],
    ['clarinet', 'trumpet'],
    ['clinton', 'obama'],
    ['coffee', 'tea'],
    ['coke', 'pepsi'],
    ['complex', 'simple'],
    ['con', 'pro'],
    ['congress', 'president'],
    ['cow', 'pig'],
    ['cowboy', 'indian'],
    ['cops', 'robbers'],
    ['death', 'life'],
    ['deaths', 'lives'],
    ['different', 'same'],
    ['east', 'west'],
    ['eastern', 'western'],
    ['election', 'results'],
    ['england', 'france'],
    ['false', 'true'],
    ['father', 'mother'],
    ['football', 'soccer'],
    ['found', 'lost'],
    ['fork', 'knife'],
    ['fork', 'spoon'],
    ['france', 'spain'],
    ['friday', 'monday'],
    ['frog', 'toad'],
    ['future', 'past'],
    ['galaxy', 'universe'],
    ['germany', 'italy'],
    ['glockenspiel', 'timpani'],
    ['goat', 'sheep'],
    ['guitar', 'violin'],
    ['hamburger', 'sandwich'],
    ['happiest', 'saddest'],
    ['happy', 'sad'],
    ['hate', 'love'],
    ['head', 'tail'],
    ['juice', 'milk'],
    ['largest', 'smallest'],
    ['lost', 'recovered'],
    ['love', 'peace'],
    ['master', 'slave'],
    ['mets', 'yankees'],
    ['missile', 'rocket'],
    ['moon', 'sun'],
    ['movie', 'song'],
    ['nail', 'screw'],
    ['news', 'weather'],
    ['north', 'south'],
    ['northern', 'southern'],
    ['nuclear', 'physics'],
    ['nun', 'priest'],
    ['orange', 'purple'],
    ['peace', 'war'],
    ['pizza', 'taco'],
    ['planet', 'star'],
    ['plant', 'tree'],
    ['protest', 'riot'],
    ['radio', 'television'],
    ['receiver', 'transmitter'],
    ['refrigerator', 'stove'],
    ['religion', 'science'],
    ['saturday', 'sunday'],
    ['shoe', 'sock'],
    ['shop', 'store'],
    ['short', 'tall'],
    ['telephone', 'television']

];