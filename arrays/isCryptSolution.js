/**
 * A cryptarithm is a mathematical puzzle for which the goal is to find the correspondence between letters and digits, such that the given arithmetic equation consisting of letters holds true when the letters are converted to digits.

You have an array of strings crypt, the cryptarithm, and an an array containing the mapping of letters and digits, solution. The array crypt will contain three non-empty strings that follow the structure: [word1, word2, word3], which should be interpreted as the word1 + word2 = word3 cryptarithm.

If crypt, when it is decoded by replacing all of the letters in the cryptarithm with digits using the mapping in solution, becomes a valid arithmetic equation containing no numbers with leading zeroes, the answer is true. If it does not become a valid arithmetic solution, the answer is false.

Note that number 0 doesn't contain leading zeroes (while for example 00 or 0123 do).

Example

For crypt = ["SEND", "MORE", "MONEY"] and

solution = [['O', '0'],
            ['M', '1'],
            ['Y', '2'],
            ['E', '5'],
            ['N', '6'],
            ['D', '7'],
            ['R', '8'],
            ['S', '9']]
the output should be
solution(crypt, solution) = true.

When you decrypt "SEND", "MORE", and "MONEY" using the mapping given in crypt, you get 9567 + 1085 = 10652 which is correct and a valid arithmetic equation.

For crypt = ["TEN", "TWO", "ONE"] and

solution = [['O', '1'],
            ['T', '0'],
            ['W', '9'],
            ['E', '5'],
            ['N', '4']]
 */

function solution(crypt, solution) {
    // map solution 
    // go through each crypt[i], get the value from map 
    // equation: A + B = C
    // i: 0 = A, 1 = B, 2 = C
    // edge cases:
    // if contains leading zeros (00123 or 020) return false
    
    // const obj = Object.fromEntries(solution.map(([k, v]) => [k, v]))
    // console.log(obj)
    // console.log(JSON.stringify(obj, null, 4))
    // const obj2 = Object.assign(...solution.map(([k, v]) => ({ [k]: v }) ));
    // console.log(obj2)
    // console.log(JSON.stringify(obj2, null, 4))
    // dictionary:
    const map = new Map(solution.map(([k, v]) => [k, v]))
    // console.log(map)
    const stack = []
    for (const cmd of crypt) {
        let len = cmd.length
        let str = ''
        
        // if (len > 1 && cmd.charAt(0) === '0') return false
        for (let i=0; i<len; i++) {
            // if (len > 0 && cmd.charAt(0) === '0') return false
            if (map.has(cmd.charAt(i))) {
                str += map.get(cmd.charAt(i))
            }
        }
        if (str.length > 1 && str.charAt(0) === '0') return false 
        stack.push(parseInt(str, 10))
        console.log(stack)
    }
    return (stack[0] + stack[1] === stack[2]) ? true : false
}
