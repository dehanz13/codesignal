/**
 * Sudoku is a number-placement puzzle. The objective is to fill a 9 × 9 grid with numbers in such a way that each column, each row, and each of the nine 3 × 3 sub-grids that compose the grid all contain all of the numbers from 1 to 9 one time.

Implement an algorithm that will check whether the given grid of numbers represents a valid Sudoku puzzle according to the layout rules described above. Note that the puzzle represented by grid does not have to be solvable.

Example

For

grid = [['.', '.', '.', '1', '4', '.', '.', '2', '.'],
        ['.', '.', '6', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '1', '.', '.', '.', '.', '.', '.'],
        ['.', '6', '7', '.', '.', '.', '.', '.', '9'],
        ['.', '.', '.', '.', '.', '.', '8', '1', '.'],
        ['.', '3', '.', '.', '.', '.', '.', '.', '6'],
        ['.', '.', '.', '.', '.', '7', '.', '.', '.'],
        ['.', '.', '.', '5', '.', '.', '.', '7', '.']]
the output should be
solution(grid) = true;

For

grid = [['.', '.', '.', '.', '2', '.', '.', '9', '.'],
        ['.', '.', '.', '.', '6', '.', '.', '.', '.'],
        ['7', '1', '.', '.', '7', '5', '.', '.', '.'],
        ['.', '7', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '8', '3', '.', '.', '.'],
        ['.', '.', '8', '.', '.', '7', '.', '6', '.'],
        ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
        ['.', '1', '.', '2', '.', '.', '.', '.', '.'],
        ['.', '2', '.', '.', '3', '.', '.', '.', '.']]
the output should be
solution(grid) = false.

The given grid is not correct because there are two 1s in the second column. Each column, each row, and each 3 × 3 subgrid can only contain the numbers 1 through 9 one time.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.char grid

A 9 × 9 array of characters, in which each character is either a digit from '1' to '9' or a period '.'.

[output] boolean

Return true if grid represents a valid Sudoku puzzle, otherwise return false.
 */

function solution(grid) {
    // edge case: unique numbers each row & col
    // options: backtracking, recursion, DFS, use Map() or Set() to avoid duplicates, build state-space tree
    // brute-force: 
    // - we can use 1 hash map or 3 has map to create a map to store unique numbers for each: col, row, 3x3 sub grid.
    // - we don't need to fill the dot values. We'll only check that we have unique values in each column, row and sub grid.
    // - complexity = O(n^2)
    
    const n = grid.length;
    const map = {}
    // dfs(board, n)
    for(let i = 0; i< n; i++){
        for(let j =0 ; j < n; j++){
            let currentValue = grid[i][j];
            if(currentValue === '.') continue;
            let subBox = Math.floor(i/3) + "." + Math.floor(j/3)
            console.log("subBox = " + subBox)
            map["row"+i] = map["row"+i] || {};
            map["col"+j] = map["col"+j] || {};
            map[subBox] = map[subBox] || {};
            
            if(map["row"+i][currentValue] || map["col"+j][currentValue] || map[subBox][currentValue]) {
                return false;
            }
            
            map["row"+i][currentValue] = true;
            map["col"+j][currentValue] = true;
            map[subBox][currentValue] = true;
            // console.log("map = " + JSON.stringify(map, null, 4))
            
        }
    }
    console.log("map = " + JSON.stringify(map, null, 4))
    return true;
}

// if board needs to be solved.
// function dfs(board, n) {
//     // for every call in the sudoku
//     for (let row=0; row < n; row++) {
//         for (let col=0; col < n; col++) {
//             // if it's empty
//             if (board[row][col] !== '.') continue;
//             // try every number 1-9
//             for (let i = 1; i <= 9; i++) {
//                 const c = i.toString();
//                 // if that number is valid
//                 if (isValid(board, row, col, n, c)) {
//                     board[row][col] = c;
//                     // continue search for that board, return true if solution is reached
//                     if (dfs(board, n)) return true;
//                 }
//             }
//             // solution wasn't found for any number 1-9 here, must be a dead end now...
//             // set the current cell back to empty
//             board[row][col] = '.';
//             // return false to signal dead end
//             return false;
//         }
//     }
//     // all cells filled, must be a solution
//     console.log(board)
//     return true;
// }

// function isValid(board, row, col, n, c) {
//     const blockRow = Math.floor(row / 3) * 3;
//     const blockCol = Math.floor(col / 3) * 3;
//     // console.log("blockRow: " + blockRow + ", blockCol: " + blockCol)
//     for (let i = 0; i < n; i++) {
//         if (board[row][i] === c || board[i][col] === c) return false
//         const curRow = blockRow + Math.floor(i / 3);
//         const curCol = blockCol + Math.floor(i % 3);
//         // console.log("(i / 3): " + Math.floor(i / 3) + ", (i % 3): " + Math.floor(i % 3)+ "  |  curRow: " + curRow + ", curCol: " + curCol)
//         if (board[curRow][curCol] === c) {
//             // console.log("board[curRow][curCol]: " + board[curRow][curCol] + " === c: " + c)
//             return false;
//         }
//     }
//     console.log("n-" + n + ".) board[row][col]: " + board[row][col] + " === c: " + c)
//     return true;
// }