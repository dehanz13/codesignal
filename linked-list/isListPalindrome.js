/** Note: Try to solve this task in O(n) time using O(1) additional space, where n is the number of elements in the list, since this is what you'll be asked to do during an interview.

Given a singly linked list of integers l and an integer k, remove all elements from list l that have a value equal to k.

Example

For l = [3, 1, 2, 3, 4, 5] and k = 3, the output should be
solution(l, k) = [1, 2, 4, 5];
For l = [1, 2, 3, 4, 5, 6, 7] and k = 10, the output should be
solution(l, k) = [1, 2, 3, 4, 5, 6, 7].
*/


// Singly-linked lists are already defined with this interface:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//
function solution(l, k) {
    let head = l;
    let prev;
    while (l) {
        if (l.value === k) {
            if (!prev) {
                head = l = l.next
                continue
            } else {
                prev.next = l.next
                l = l.next
                continue
            }
        }
        prev = l
        l = l.next
    }
    return head
}

class LinkedList {
    constructor() {
        this.head;
        this.size = 0;
    }
    
    addFront(value) {
        const newNode = new Node(value);
        
        if (this.head) {
            newNode.next = this.head;
        }
        
        this.head = newNode;
        this.size++
    }
    
    insertAt(value, idx) {
        let curr = this.head;
        let prev;
        
        while (curr && idx > 0) {
            prev = curr;
            curr = curr.next;
            idx--;
        }
        
        if (prev) {
            prev.next = new Node(value);
            prev.next.next = curr;
            this.size++;
        } else {
            this.addFront(value)
        }
    }
    
    remove(value) {
        let curr = this.head;
        let prev;
        
        while (curr) {
            if (curr.val === value) {
                if (prev) {
                    prev.next = curr.next;
                }
                else {
                    this.head = undefined;
                }
                
                this.size--;
                return true;
            }
            
            prev = curr;
            curr = curr.next;
        }
        
        return false
    }
    
    length() {
        return this.size;
    }
    
    empty() {
        return !this.size;
    }
    
    toString() {
        const result = [];
        let curr = this.head;
        
        while (curr) {
            result.push(curr.val);
            curr = curr.next;
        }
        
        return result.join("->");
    }
}

class Node {
    constructor(val, nextNode = null) {
        this.val = val;
        this.next = nextNode;
    }
}