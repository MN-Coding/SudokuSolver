import { clearBoard, highlightSpot, updateBoard } from './index.js'

export function start(){
    let board = makeBackendBoard()

    if(!board){
        alert('Invalid Input')
        return
    }
    
    if (!isValidBoard(board)){
        clearBoard()
        alert('Board Invalid')
        return
    }
    
    sol(board)
    updateBoard(board)
}

function sol(board){

    let emptyPair = nextEmpty(board)
    if (!emptyPair){
        return true
    }

    let row = emptyPair[0]
    let col = emptyPair[1]

    for(let i = 1; i < 10; i++){
        if (isValid(i, row, col, board)){
            board[row][col] = i
            //updateSpot(row, col, i)
            if(sol(board)){
                return true
            }
            board[row][col] = 0
        }
    }
    return false
}

function makeBackendBoard(){
    let coords = []

    for (let i = 0; i < 9; i++){
        coords[i] = []
        for (let j = 0; j < 9; j++){
            let value = document.getElementById((i.toString()).concat(j.toString())).value
            
            if (value){
                coords[i][j] = parseInt(value)
            }else{
                coords[i][j] = 0
            }
            
            if (Number.isNaN(coords[i][j])){ //Check to see if input is number
                //clearSpot(i, j)
                highlightSpot(i, j)
                return false
            }
        }
    }
    return coords
}

//Function to check if board is initially valid
function isValidBoard(board){
    
    //Row Check
    for (let i = 0; i < 9; i++){ //row
        let numsInRow = []
        for (let j = 0; j < 9; j++){ //col
            if (board[i][j] != 0){
                for (let k = 0; k < numsInRow.length; k++){
                    if (board[i][j] == numsInRow[k]){
                        return false
                    }
                }
                numsInRow[numsInRow.length] = board[i][j]
            }
        }
    }

    //Column Check
    for (let i = 0; i < 9; i++){ //col
        let numsInCol = []
        for (let j = 0; j < 9; j++){ //row
            if (board[j][i] != 0){
                for (let k = 0; k < numsInCol.length; k++){
                    if (board[j][i] == numsInCol[k]){
                        return false
                    }
                }
                numsInCol[numsInCol.length] = board[j][i]
            }
        }
    }

    //Square Check
    for(let g = 0; g < 3; g++){
        for(let h = 0; h < 3; h++){
            let numsInSquare = []
                for(let i = g * 3; i < g * 3 + 3; i++){
                    for(let j = h * 3; j < h * 3 + 3; j++){
                        if (board[i][j] != 0){
                            for (let k = 0; k < numsInSquare.length; k++){
                                if (board[i][j] == numsInSquare[k]){
                                    return false
                                }
                            }
                            numsInSquare[numsInSquare.length] = board[i][j]
                        }
                    }
                }
        }
    }

    return true
}

//Function to check if number is valid at spot
function isValid(number, row, col, board){
    //Row + Column Check
    for(let i = 0; i < 9; i ++){
        if (board[row][i] == number && i != col){
            return false
        }else if (board[i][col] == number && i!= row){
            return false
        }
    }

    //Square Check
    let bigRow = Math.floor(row / 3)
    let bigCol = Math.floor(col / 3)
    for(let i = 3 * bigRow; i < 3 * bigRow + 3; i++){
        for(let j = 3 * bigCol; j < 3 * bigCol + 3; j++){
            if (board[i][j] == number && i != row && j != col){
                return false
            }
        }
    }
    
    return true
}

function nextEmpty(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if (board[i][j] == 0){
                return [i, j]
            }
        }
    }
    return false
}