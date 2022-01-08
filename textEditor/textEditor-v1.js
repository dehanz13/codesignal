/**
 * 
 * @param {[...actions]} actions 
 * @returns string
 * 
 * Operations:
 * - INSERT
 * - DELETE (last character)
 * - UNDO (last action)
 * - REDO (actions after undo)
 * - COPY
 * - PASTE
 * 
 * approach:
 * - use 2 stacks for actions performed and actions undo's to recall 
 * - reverse the array first in order to avoid unshift() which could be a costly operation
 */
function TextEditor(actions) {
  const result = []
  const performedStack = []
  const recallStack = []
  const clipboard = []
  let currentTop = 0
  
  actions.reverse();
  
  for (
    let action = actions.pop();
    action !== undefined;
    action = actions.pop()
  ) {
    if (action[1] === "INSERT") {
      result.push(action[2]);
      performedStack.push(action)
      currentTop++
    } else if (action[1] === "DELETE") {
      // delete last character
      const letterToBeDeleted = result[result.length-1].slice(0, -1) // Toda
      const deletedLetter = result.pop()
      const letter = deletedLetter[deletedLetter.length-1] // 'y'
      result.push(letterToBeDeleted)
      performedStack.push([action[0], action[1], letter]);
      currentTop--;
      
    } else if (action[1] === "UNDO") {
      // check if performedStack is not empty
      if (performedStack.length) {
        const undoAction = performedStack.pop();
        currentTop--
        // check if it was insert, then pop from stack
        if (undoAction[1] === "INSERT") {
          result.pop()
        }
        // check if it was delete, then put back the letter into the stack
        else if (undoAction[1] === "DELETE") {
          const initialText = performedStack[performedStack.length-1][2]
          result.pop()
          result.push(initialText)
          // result.push(undoAction[1])
        }
        
        else if (undoAction[1] === "PASTE") result.pop()
        // then push this undo action into the recall stack in case of a redo
        recallStack.push(undoAction);
        currentTop++;
      }
    } else if (action[1] === "REDO") {
      // check if recall stack is not empty
      if (recallStack.length) {
        const redoElement = recallStack.pop()
        actions.push(redoElement);
      }
    } else if (action[1] === "COPY") {
      const idx = action[2]
      const textCoppied = result.join("").slice(idx)
      if (clipboard.length) {
        clipboard.pop();
      }
      clipboard.push(textCoppied)
    } else if (action[1] === "PASTE") {
      
      const pasted = clipboard[0]
      result.push(pasted)
      performedStack.push([action[1], pasted])
      currentTop++;
      
    } else if (action[1] === "SELECT") {
      const pasted = "test"
    }
  }
  // console.log(clipboard.length)
  console.log("-> " + result.join(""))
  return result.join("")

}
// const operations = ["INSERT ", "COPY 0", "UNDO", "PASTE", "PASTE", "COPY 2", "PASTE", "PASTE", "DELETE", "INSERT aaam", "DELETE", "UNDO", "UNDO"]
// const operations = ["3 INSERT DamnDaniel", "1 INSERT aaam", "4 DELETE", "2 UNDO", "9 UNDO", "10 REDO"]
const operations = ["1 INSERT aaam", "2 DELETE", "4 UNDO", "5 REDO", "6 UNDO", "7 REDO"]
operations.sort()
let newOperations = operations.map((element, idx) => {
  const str = element.split(",")
  return str[0].split(/[ ,]+/);
})
TextEditor(newOperations)

// with timestamps:
// TextEditor([
//   ["1200", "INSERT", "Code"],
//   ["1210", "INSERT", "Signal"],
//   ["1220", "INSERT", " OA."],
//   // ["1260", "DELETE"],
//   // ["1250", "UNDO"],
//   ["1240", "INSERT", " Today"],
//   ["1260", "DELETE"],
//   ["1100", "UNDO"]
// ])