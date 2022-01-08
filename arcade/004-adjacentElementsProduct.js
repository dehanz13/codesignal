/**
 * Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.

Example

For inputArray = [3, 6, -2, -5, 7, 3], the output should be
solution(inputArray) = 21.

7 and 3 produce the largest product.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer inputArray

An array of integers containing at least two elements.

Guaranteed constraints:
2 ≤ inputArray.length ≤ 10,
-1000 ≤ inputArray[i] ≤ 1000.

[output] integer

The largest product of adjacent elements.
 */

function solution(inputArray) {
    let newArr = inputArray,
        x = 0,
        y = 0,
        p = -Infinity
        
    for (let i=0; i<newArr.length; i++) {
        x = newArr[i]
        y = newArr[i + 1]
        if (x * y > p) p=x*y
    }
    return p
}
