/**
 * You are given a list dishes, where each element consists of a list of strings beginning with the name of the dish, followed by all the ingredients used in preparing it. You want to group the dishes by ingredients, so that for each ingredient you'll be able to find all the dishes that contain it (if there are at least 2 such dishes).

Return an array where each element is a list beginning with the ingredient name, followed by the names of all the dishes that contain this ingredient. The dishes inside each list should be sorted lexicographically, and the result array should be sorted lexicographically by the names of the ingredients.

Example

For
  dishes = [["Salad", "Tomato", "Cucumber", "Salad", "Sauce"],
            ["Pizza", "Tomato", "Sausage", "Sauce", "Dough"],
            ["Quesadilla", "Chicken", "Cheese", "Sauce"],
            ["Sandwich", "Salad", "Bread", "Tomato", "Cheese"]]
the output should be
  solution(dishes) = [["Cheese", "Quesadilla", "Sandwich"],
                            ["Salad", "Salad", "Sandwich"],
                            ["Sauce", "Pizza", "Quesadilla", "Salad"],
                            ["Tomato", "Pizza", "Salad", "Sandwich"]]
For
  dishes = [["Pasta", "Tomato Sauce", "Onions", "Garlic"],
            ["Chicken Curry", "Chicken", "Curry Sauce"],
            ["Fried Rice", "Rice", "Onions", "Nuts"],
            ["Salad", "Spinach", "Nuts"],
            ["Sandwich", "Cheese", "Bread"],
            ["Quesadilla", "Chicken", "Cheese"]]
the output should be
  solution(dishes) = [["Cheese", "Quesadilla", "Sandwich"],
                            ["Chicken", "Chicken Curry", "Quesadilla"],
                            ["Nuts", "Fried Rice", "Salad"],
                            ["Onions", "Fried Rice", "Pasta"]]
Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.string dishes

An array of dishes, where dishes[i] for each valid i contains information about the ith dish: dishes[i][0] is the name of the dish, and all the elements after it are the ingredients of that dish. Both the dish name and the ingredient names consist of English letters and spaces. It is guaranteed that all dish names are different. It is also guaranteed that the ingredient names for any one dish are also pairwise distinct.

Guaranteed constraints:
1 ≤ dishes.length ≤ 500,
2 ≤ dishes[i].length ≤ 10,
1 ≤ dishes[i][j].length ≤ 50.

[output] array.array.string

The array containing the grouped dishes.
 */

function solution(dishes) {
    // dishes[0][0] = dish name
    // put ingredients in Set()
    // put dishes in Map()
    
    let hash = {}
    
    dishes.forEach((dish) => {
        let name = dish[0]
        
        for (let i=1; i<dish.length; i++) {
            if (!hash[dish[i]]) {
                // console.log("New Ingredient!")
                hash[dish[i]]=[]
                hash[dish[i]].push(name)
                // console.log("dish: " + name + " was added in " + dish[i])
            } else {
                // console.log("Ingredient already exist :)")
                hash[dish[i]].push(name)
                // console.log("dish: " + name + " was added in " + dish[i])
            } 
        }
    })
    
    return select(hash)
}
function select(hash) {
    let selected = []
    
    for (const [key, val] of Object.entries(hash)){
        
        // console.log("-> key: " + key + ", val: " + val)
        if (val.length > 1) {
            let arr = []
            arr.push(key)
            // console.log("key: " + key + ", arr: " + arr)
            arr = arr.concat(val.sort())
            // console.log("Sorted arr: " + arr)
            selected.push(arr)
            // console.log("selected: ", selected)
        }
    }
    // console.log("selected: ", selected)
    
    return selected.sort((a, b) => a[0] < b[0] ? -1 : a[0] === b[0] ? 0 : 1)
}