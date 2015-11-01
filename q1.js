
/**
 * @author  Brent Zerbe
 * @date    10/31/2015
 * @class   CIS-336
 * @purpose Show the performance difference between passing a large array by
 * value vs reference in Javascript
 */


/**
 * Class that holds a large array
 * @param {array} a large array
 */

(function() {
  var CustomLargeArray, bufferedArray, bufferedStringArray, customArray, customStringArray, getArrayOfInt, getArrayOfString, makeBufferedArray, receiveArray, regularArray, regularStringArray, runTimes, timePerformance;

  CustomLargeArray = (function() {
    function CustomLargeArray(array) {
      this.customArray = array;
    }

    return CustomLargeArray;

  })();


  /**
   * Create a Buffered Array with the contents of the passed array. The array is
   * viewed as an Uint8Array.
   * @param  {array}       inputArray  Array of objecs
   * @return {ArrayBuffer}             ArrayBuffer containing the inputArray contents
   */

  makeBufferedArray = function(inputArray) {
    var buffer, buffersize, length, magic, r, s, _i, _len;
    length = inputArray.length;
    buffersize = length * 2;
    buffer = new ArrayBuffer(buffersize);
    magic = new Uint8Array(buffer);
    for (s = _i = 0, _len = inputArray.length; _i < _len; s = ++_i) {
      r = inputArray[s];
      magic[s] = r;
    }
    return buffer;
  };


  /**
   * Create an integer array with a specified amount of values
   * @param  {int}  amount  The size of the array
   * @return {array}        The created array
   */

  getArrayOfInt = function(amount) {
    var _i, _ref, _results;
    _results = [];
    for (_i = 0, _ref = amount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
      _results.push(0);
    }
    return _results;
  };


  /**
   * Create an array of strings with a specified amount of strings
   * @param  {int}  amount  The size of the array
   * @return {array}        The created array
   */

  getArrayOfString = function(amount) {
    var _i, _ref, _results;
    _results = [];
    for (_i = 0, _ref = amount - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
      _results.push("String");
    }
    return _results;
  };


  /**
   * Function that only receives one parameter and then returns null
   * @param  {array}  array   The array to pass
   * @return {null}           Return void
   */

  receiveArray = function(array) {
    return null;
  };


  /**
   * Logs the time it takes to pass an array parameter to a function.
   * @param  {function} theFunction   The function to pass the parameters to
   * @param  {string}   name          Text to include in the log
   * @param  {array}    array         The array to pass to the function
   * @param  {int}      numberOfRuns  The number of times the parameter should be passed
   * @param  {bool}     isByValue     If the array should be passed by value
   */

  timePerformance = function(theFunction, name, array, numberOfRuns, isByValue) {
    var timeStart, timeStop, _i;
    timeStart = performance.now();
    for (_i = 0; 0 <= numberOfRuns ? _i <= numberOfRuns : _i >= numberOfRuns; 0 <= numberOfRuns ? _i++ : _i--) {
      if (isByValue) {
        theFunction(array.slice());
      } else {
        theFunction(array);
      }
    }
    timeStop = performance.now();
    return console.log(name + ": " + (timeStop - timeStart));
  };

  regularArray = getArrayOfInt(100000);

  customArray = new CustomLargeArray(regularArray);

  bufferedArray = makeBufferedArray(regularArray);

  regularStringArray = getArrayOfString(100000);

  customStringArray = new CustomLargeArray(regularStringArray);

  bufferedStringArray = makeBufferedArray(regularStringArray);

  runTimes = 50000;

  timePerformance(receiveArray, "int by value", regularArray, runTimes, true);

  timePerformance(receiveArray, "int by reference", regularArray, runTimes, false);

  timePerformance(receiveArray, "int in object reference", customArray, runTimes, false);

  timePerformance(receiveArray, "int buffered", bufferedArray, runTimes, false);

  timePerformance(receiveArray, "string by value", regularStringArray, runTimes, true);

  timePerformance(receiveArray, "string by reference", regularStringArray, runTimes, false);

  timePerformance(receiveArray, "string in object reference", customStringArray, runTimes, false);

  timePerformance(receiveArray, "string buffered", bufferedStringArray, runTimes, false);

}).call(this);
