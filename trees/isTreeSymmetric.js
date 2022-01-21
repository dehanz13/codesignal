/**
 * Given a binary tree t, determine whether it is symmetric around its center, i.e. each side mirrors the other.

Example

For

t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {
            "value": 3,
            "left": null,
            "right": null
        },
        "right": {
            "value": 4,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": {
            "value": 4,
            "left": null,
            "right": null
        },
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
the output should be solution(t) = true.

Here's what the tree in this example looks like:

    1
   / \
  2   2
 / \ / \
3  4 4  3
As you can see, it is symmetric.

For

t = {
    "value": 1,
    "left": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 2,
        "left": null,
        "right": {
            "value": 3,
            "left": null,
            "right": null
        }
    }
}
the output should be solution(t) = false.

Here's what the tree in this example looks like:

    1
   / \
  2   2
   \   \
   3    3
As you can see, it is not symmetric.

Input/Output

[execution time limit] 4 seconds (js)

[input] tree.integer t

A binary tree of integers.

Guaranteed constraints:
0 ≤ tree size < 5 · 104,
-1000 ≤ node value ≤ 1000.

[output] boolean

Return true if t is symmetric and false otherwise.
 */

//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function solution(t) {
    // sanity check
    if (!t) return true
    
    // #1) Preorder Traversal -- Time: O(n), Space: O(1) if we ignore the recursion stack
    // check if tree s & t are mirroring each other
    function isMirror(s, t) {
        if (!s && !t) {
            return true; // both nodes are null, ok
        }
        if (!s || !t || s.value !== t.value) {
            return false; // found a mismatch
        }
        // compare the left subtree of 's' with the right subtree of 't'
        // and the right subtree of 's' with the left subtree of 't'
        return isMirror(s.left, t.right) && isMirror(s.right, t.left)
    }
    // --------------------------------------
    // #2) Iteratively -- Time O(n), Space: height of tree
    // it's easy to convert the above preorder to make it traverse iteratively using stack.
    function isMirror2(p, q) {
        // create 2 stacks
        let s1 = [p], s2 = [q];
        
        // perform preorder traversal
        while (s1.length > 0 || s2.length > 0) {
            let n1 = s1.pop(), n2 = s2.pop();
            
            // 2 null nodes, let's continue
            if (!n1 && !n2) continue;
            
            // return false as long as there is a mismatch
            if (!n1 || !n2 || n1.value !== n2.value) return false
            
            // scan tree s from left to right
            // and scan tree t from right to left
            s1.push(n1.left); s1.push(n1.right);
            s2.push(n2.right); s2.push(n2.left);
        }
        return true;
    }
    
    // --------------------------------------
    // #3) BFS -- Time: O(n), Space: width of tree
    // we just need to traverse both subtress in level order, one from left to right, and the other one from right to left.
    function isMirror3(s, t) {
        let q1 = [s], q2 = [t];
        
        // perform breadth-first search
        while (q1.length > 0 || q2.length > 0) {
            // dequeue
            let n1 = q1.shift(), n2 = q2.shift();
            
            // 2 null nodes, let's continue
            if (!n1 && !n2) continue;
            
            // return false as long as there is a mismatch
            if (!n1 || !n2 || n1.value !== n2.value) return false;
            
            // scan tree s from left to right
            // and scan tree t from right to left
            q1.push(n1.left); q1.push(n1.right);
            q2.push(n2.right); q2.push(n2.left);
        }
        return true;
    }
    
    return isMirror3(t.left, t.right);
}
