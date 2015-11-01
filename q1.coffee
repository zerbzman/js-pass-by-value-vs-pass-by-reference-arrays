###*
 * @author  Brent Zerbe
 * @date    10/31/2015
 * @class   CIS-336
 * @purpose Show the performance difference between passing a large array by
 * value vs reference in Javascript
###

###*
 * Class that holds a large array
 * @param {array} a large array
###
class CustomLargeArray
  constructor: ( array ) ->
    @customArray = array

###*
 * Create a Buffered Array with the contents of the passed array. The array is
 * viewed as an Uint8Array.
 * @param  {array}       inputArray  Array of objecs
 * @return {ArrayBuffer}             ArrayBuffer containing the inputArray contents
###
makeBufferedArray = ( inputArray ) ->
	length = inputArray.length
	buffersize = length * 2
	buffer = new ArrayBuffer buffersize
	magic = new Uint8Array buffer
	for r, s in inputArray
		magic[s] = r
	buffer

###*
 * Create an integer array with a specified amount of values
 * @param  {int}  amount  The size of the array
 * @return {array}        The created array
###
getArrayOfInt = ( amount ) ->
  for [ 0..amount - 1 ]
    0

###*
 * Create an array of strings with a specified amount of strings
 * @param  {int}  amount  The size of the array
 * @return {array}        The created array
###
getArrayOfString = ( amount ) ->
  for [ 0..amount - 1 ]
    "String"

###*
 * Function that only receives one parameter and then returns null
 * @param  {array}  array   The array to pass
 * @return {null}           Return void
###
receiveArray = ( array ) ->
  null

###*
 * Logs the time it takes to pass an array parameter to a function.
 * @param  {function} theFunction   The function to pass the parameters to
 * @param  {string}   name          Text to include in the log
 * @param  {array}    array         The array to pass to the function
 * @param  {int}      numberOfRuns  The number of times the parameter should be passed
 * @param  {bool}     isByValue     If the array should be passed by value
###
timePerformance = ( theFunction, name, array, numberOfRuns, isByValue ) ->
  timeStart = performance.now()
  for [0..numberOfRuns]
    if isByValue
      theFunction array.slice()
    else
      theFunction array
  timeStop = performance.now()

  console.log name + ": " + ( timeStop - timeStart )

# Create the arrays
regularArray = getArrayOfInt 100000
customArray = new CustomLargeArray regularArray
bufferedArray = makeBufferedArray regularArray

regularStringArray = getArrayOfString 100000
customStringArray = new CustomLargeArray regularStringArray
bufferedStringArray = makeBufferedArray regularStringArray

runTimes = 50000
# Run the timings
timePerformance receiveArray, "int by value", regularArray, runTimes, true
timePerformance receiveArray, "int by reference", regularArray, runTimes, false
timePerformance receiveArray, "int in object reference", customArray, runTimes, false
timePerformance receiveArray, "int buffered", bufferedArray, runTimes, false
timePerformance receiveArray, "string by value", regularStringArray, runTimes, true
timePerformance receiveArray, "string by reference", regularStringArray, runTimes, false
timePerformance receiveArray, "string in object reference", customStringArray, runTimes, false
timePerformance receiveArray, "string buffered", bufferedStringArray, runTimes, false
