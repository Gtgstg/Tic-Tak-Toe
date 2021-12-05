'use strict';
let board = [];
let turn = 'X';
const fs = require('fs');

let inputString = '';
let currentLine = 0;

const readLine = ()=>{
    return inputString[currentLine++];
}

process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});
    
const checkWinner = ()=>{
    let winningCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    for (let a = 0; a < 8; a++) {
        let line = "";

        for(let b = 0; b < 3; b++){
            line += board[winningCondition[a][b]];
        }
        
        //For X winner
        if (line === "XXX") {
            return "X";
        }
            
        // For O winner
        else if (line === "OOO") {
            return "O";
        }
    }
        
    for (let a = 0; a < 9; a++) {
        if (board.toString().includes(a.toString())) {
            break;
        }
        else if (a == 8) {
            return "draw";
        }
    }
    
  
    // To enter the X Or O at the exact place on board.
    console.log(
        turn + "'s turn; enter a slot number to place "
        + turn + " in:");
    return null;
}
      
    // To print out the board.
    /*  |   |    
      1 | 2 | 3
    -------------
      4 | 5 | 6
    -------------
      7 | 8 | 9
        |   |  */
    
const printBoard = ()=>{
    console.log("    |   |    ");
    console.log("  " + board[0] + " | " + board[1] + " | " + board[2]);
    console.log("-------------");
    console.log("  "+ board[3] + " | " + board[4] + " | " + board[5]);
    console.log("-------------");
    console.log("  "+ board[6] + " | " + board[7] + " | " + board[8]);
    console.log("    |   |    ");
}

const main = () =>{
    
    let winner = null;
    
    for (let a = 0; a < 9; a++) {
        board.push((a + 1).toString());
    }
    
    console.log("Welcome to 3x3 Tic Tac Toe.");
    printBoard();
    
    console.log("X will play first. Enter a slot number to place X in:");
    console.log(inputString);
    while (winner == null) {
        let numInput;
        
        // Exception handling.
        // numInput will take input from user like from 1 to 9.
        // If it is not in range from 1 to 9.
        // then it will show you an error "Invalid input."
        try {
            numInput = parseInt(readLine(), 10);
            console.log(numInput);
            if (!(numInput > 0 && numInput <= 9)) {
                console.log(
                    "Invalid input; re-enter slot number:");
                continue;
            }
        }
        catch (err) {
            console.log(
                "Invalid input; re-enter slot number:");
            continue;
        }
            
        // This game has two player x and O.
        // Here is the logic to decide the turn.
        if (board[numInput - 1] === numInput.toString()) {
            board[numInput - 1] = turn;
    
            if (turn === "X") {
                turn = "O";
            }
            else {
                turn = "X";
            }
    
            printBoard();
            winner = checkWinner();
        }
        else {
            console.log("Slot already taken; re-enter slot number:");
        }
    }
    
    // If no one win or lose from both player x and O.
    // then here is the logic to print "draw".
    if (winner === "draw") {
        console.log(
            "It's a draw! Thanks for playing.");
    }
    
    // For winner -to display Congratulations! message.
    else {
        console.log("Congratulations! " + winner
            + "'s have won! Thanks for playing.");
    }
}
