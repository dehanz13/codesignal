/**
 * You're given 2 huge integers represented by linked lists. Each linked list element is a number from 0 to 9999 that represents a number with exactly 4 digits. The represented number might have leading zeros. Your task is to add up these huge integers and return the result in the same format.

Example

For a = [9876, 5432, 1999] and b = [1, 8001], the output should be
solution(a, b) = [9876, 5434, 0].

Explanation: 987654321999 + 18001 = 987654340000.

For a = [123, 4, 5] and b = [100, 100, 100], the output should be
solution(a, b) = [223, 104, 105].

Explanation: 12300040005 + 10001000100 = 22301040105.

Input/Output

[execution time limit] 4 seconds (js)

[input] linkedlist.integer a

The first number, without its leading zeros.

Guaranteed constraints:
0 ≤ a size ≤ 104,
0 ≤ element value ≤ 9999.

[input] linkedlist.integer b

The second number, without its leading zeros.

Guaranteed constraints:
0 ≤ b size ≤ 104,
0 ≤ element value ≤ 9999.

[output] linkedlist.integer

The result of adding a and b together, returned without leading zeros in the same format.
 */

// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
// solution #1
function solution(a, b) {
    let carry = 0, sum = null, x, y, prev;
    
    const reverseList = (list) => {
        prev = null;
        while (list) {
            next = list.next;
            list.next = prev;
            prev = list;
            list = next;
        }
        return prev;
    }
    
    a = reverseList(a)
    b = reverseList(b)
    
    while (a || b || carry) {
        x = a ? a.value : 0;
        y = b ? b.value : 0;
        // console.log("x = ", x + ", y = ", y + ", carry = ", carry)
        // console.log("(carry + x + y) % 1e4 = ", (carry + x + y) % 1e4)
        prev = new ListNode((carry + x + y) % 1e4);
        // console.log("prev = ", prev.value)
        prev.next = sum;
        sum = prev;
        // console.log("(carry + x + y) = ", (carry + x + y) + "/1e4 = ", (carry + x + y) / 1e4)
        carry = (carry + x + y) / 1e4 | 0;
        // console.log("carry = ", carry)
        if (a) a = a.next;
        if (b) b = b.next;
        // console.log("-------------------------")
    }
    // console.log(sum)
    return sum;
}

// solution #2
// function solution(a, b) {
//     const str1 = ''
//     const str2 = ''
//     if (!a || !b) return false
//     let ll1 = traverse(a, str1)
//     let ll2 = traverse(b, str2)
//     const total = ('' + (parseInt(ll1) + parseInt(ll2))).match(/.{1,4}/g)
//     // console.log(+ll1 + +ll2)
//     let result;
//     for (let i = 0; i < total.length; i++) {
//         if (total[i][0] === '0') {
//             total[i] = '0'
//         }
//         // let list = new ListNode(total[i])
//         // result = finalList(list, total[i])
//         result = finalList(total[i])
//     }
//     console.log(a)
//     return result
// }

// function traverse(list, str) {
//     if (list === null) return str
//     while(list !== null) {
//         str += list.value
//         list = list.next
//     }
//     return str
// }

// function finalList(val) {
//     let list = new ListNode(val)
//     while(list) {
//         // list.value = val
//         list = list.next
//         // list.next = null
//     }
//     return list
// }
