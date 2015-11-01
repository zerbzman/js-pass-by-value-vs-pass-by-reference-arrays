# Testing pass-by-value vs pass-by-reference of arrays in Javascript.

### Explanation
I originally looked up if Javascript was pass by value or reference and found that it is pass by value except for objects. I created a test environment that would create a large integer array and pass the array to a function a large amount of times. I kept getting backwards results. Passing the array normally was happening faster than passing using an object or a typed array. I thought it might have to do with compiler optimizations. I found a [site talking about passing by reference in C++](http://www.tantalon.com/pete/cppopt/asyougo.htm#PassClassParametersByReference) and saw that strings passed by reference are 30 times faster than by value. Using this information, I created a string array to see if that had a difference. Passing the array normally I got timings that were around the same as passing using an object or buffered array. In order to get reliable numbers I had the array be 100,000 elements which isn’t that large but then I passed it 5,000,000,000 times to a function and timed that. My results confused me but it seemed pretty clear.

![timing using pass-by-reference](/timing_pass_by_reference.png)

After [further research](http://www.hunlock.com/blogs/Mastering_Javascript_Arrays#quickIDX5) I found that like C++, passing arrays is by reference only. The results from the previous test show that integer arrays are actually faster than other arrays in Google Chrome. I found a [site that mentions it briefly](http://www.html5rocks.com/en/tutorials/speed/v8/). In order to pass an array by value I had to use the .slice() function which copies the array. The results below show the difference using an array of 100,000 elements and is run only 50,000 times. The results are so drastic because the array being passed has to copy all the values of the array to a new array.

![timing pass-by-value](/timing_pass_by_value.png)

During this whole project I used jsperf.com to time the process as well because it tests performance by operations per second rather than just time. My results are at http://jsperf.com/js-pass-by-value-vs-pass-by-reference/2 and can be tested in any browser.
