import { start } from './solve.js'

for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
        let box = document.createElement("input")
        box.setAttribute("type", "text")
        box.setAttribute("maxlength", "1")
        box.className = "box"
        let id = (i.toString()).concat(j.toString())
        box.id = id
        document.getElementById("maindiv").appendChild(box)
        document.getElementById(id).addEventListener("input", () => document.getElementById(id).className = "filled")
    }
    document.getElementById("maindiv").appendChild(document.createElement("br"))
}

document.getElementById("start").addEventListener("click", start)
document.getElementById('clear').addEventListener("click", clearBoard)

export function clearBoard(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let id = (i.toString()).concat(j.toString())
            document.getElementById(id).value = ""
            document.getElementById(id).className = "box"
        }
    }
}

export function highlightSpot(row, col){
    let id = (row.toString()).concat(col.toString())
    document.getElementById(id).className = "illegal"
}

export function updateSpot(row, col, num){
    let id = (row.toString()).concat(col.toString())
    document.getElementById(id).value = num.toString()
}

export function updateBoard(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            updateSpot(i, j, board[i][j])
        }
    }
}

/*
- Game Loop to Update Spot
*/
