const WORDS = require('./data/words.json').words;
const FAMILY_NAMES = require('./data/names.json').family;
const FEMALE_NAMES = require('./data/names.json').female;
const MALE_NAMES = require('./data/names.json').male;
const LOCALES = require('./data/locales.json').locales;
const TIMEZONES = require('./data/timezones.json').timezones;
const NUMBERS = '1234567890'.split('');
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LETTERS = LOWER_LETTERS.concat(UPPER_LETTERS);
const WORD_CHARS = ['_'].concat(NUMBERS).concat(LETTERS);

var _words;
function randomWords() {
  if (!_words) {
    var allLetters = /^[a-zA-Z]+$/;
    _words = WORDS.filter(function (word) {
      return allLetters.test(word);
    });
  }
  return _words;
}

var _wordsByLength;
function randomWordsByLength() {
  if (!_wordsByLength) {
    _wordsByLength = randomWords().reduce(function (memo, word) {
      var length = word.length;

      if (memo[length]) {
        memo[length].push(word);
      } else {
        memo[length] = [word];
      }

      return memo;
    }, {});
  }

  return _wordsByLength;
}

function randomNumber(exclusiveMax) {
  return Math.random() * (typeof exclusiveMax === 'number' ? exclusiveMax : 1);
}

function randomInteger(exclusiveMax) {
  return randomNumber(exclusiveMax) | 0;
}

function randomArrayItem(array) {
  return array[randomInteger(array.length)];
}

function randomLetter() {
  return randomArrayItem(LETTERS);
}

function randomWordChar() {
  return randomArrayItem(WORD_CHARS);
}

function randomWord(length) {
  length = length || Math.max(2, randomInteger(12));

  var choices;
  do {
    choices = randomWordsByLength()[length];
    length -= 1;
  } while (!choices); // Make sure we have a valid length.

  return randomArrayItem(choices);
}

function randomSentence(maxWords) {
  maxWords = Math.max(3, maxWords || randomInteger(12));

  var words = [];
  for (var i = 0; i < maxWords; i++)
    words.push(randomWord(randomInteger(12)));

  return words.join(' ');
}

function randomGender() {
  return randomNumber() > 0.5 ? 'male' : 'female';
}

function randomGivenName(gender) {
  gender = gender || randomGender();
  return randomArrayItem(gender === 'male' ? MALE_NAMES : FEMALE_NAMES);
}

function randomFamilyName() {
  return randomArrayItem(FAMILY_NAMES);
}

function randomName(gender) {
  return [randomGivenName(gender), randomFamilyName()].join(' ');
}

function randomEmailAddress(tld) {
  tld = tld || '.com';
  return (randomGivenName() + '@' + randomWord() + '.com').toLowerCase();
}

function randomLocale(language) {
  var choices = LOCALES.slice(0);

  if (language) {
    choices = choices.filter(function (locale) {
      return locale.split('-')[0] === language;
    });
  }

  return randomArrayItem(choices);
}

function randomTimezone(region) {
  var choices = TIMEZONES.slice(0);

  if (region) {
    choices = choices.filter(function (zone) {
      return zone.split('/')[0] === region;
    });
  }

  return randomArrayItem(choices);
}

export default {
  words: randomWords,
  wordsByLength: randomWordsByLength,
  number: randomNumber,
  num: randomNumber,
  integer: randomInteger,
  int: randomInteger,
  arrayItem: randomArrayItem,
  pick: randomArrayItem,
  letter: randomLetter,
  wordChar: randomWordChar,
  word: randomWord,
  sentence: randomSentence,
  gender: randomGender,
  givenName: randomGivenName,
  familyName: randomFamilyName,
  name: randomName,
  emailAddress: randomEmailAddress,
  locale: randomLocale,
  timezone: randomTimezone
};
