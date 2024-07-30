"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardUtils = void 0;
const readlineSync = require("readline-sync");
class BoardUtils {
    static isValidBoardSize(size) {
        if (isNaN(size) || size < 3) {
            return false;
        }
        return true;
    }
    static getValidBoardSize() {
        let attempts = 1;
        let userInput = parseInt(readlineSync.question("what will be the size of matrix : "));
        while (!BoardUtils.isValidBoardSize(userInput) && attempts < 3) {
            userInput = parseInt(readlineSync.question(`Not a valid matrix size for this game, please enter number greater than 2. You have ${3 - attempts}/3 attempts left, else we'll choose 3 : `));
            attempts += 1;
        }
        userInput = attempts > 2 ? 3 : userInput;
        console.log(`You have selected the matrix: ${userInput} x ${userInput} `);
        return userInput;
    }
    static createBoard(size) {
        const matrix = [];
        const valueIndicesMatch = {};
        let prevNum = 1;
        const availableCells = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(prevNum);
                availableCells.push(prevNum);
                valueIndicesMatch[prevNum] = [i, j];
                prevNum += 1;
            }
            matrix.push(row);
        }
        return {
            matrix,
            valueIndicesMatch,
            availableCellIndices: availableCells,
        };
    }
    static printBoard(board) {
        for (let row of board) {
            console.log(row.join(" | "));
        }
        console.log("\n");
    }
    static updateAvailableMoves(availableMoves, move) {
        const index = availableMoves.indexOf(move);
        availableMoves.splice(index, 1);
    }
    static updateMoveInBoard(matrix, move, moveMadeByIcon, availableMoves, movesIndexMatchings) {
        const indices = movesIndexMatchings[move];
        matrix[indices[0]][indices[1]] = moveMadeByIcon;
        BoardUtils.updateAvailableMoves(availableMoves, move);
        BoardUtils.printBoard(matrix);
    }
    static isWinningMove(matrix) {
        const firstDiagonal = new Set();
        const secondDiagonal = new Set();
        const size = matrix.length;
        for (let i = 0; i < size; i++) {
            const row = new Set();
            const column = new Set();
            firstDiagonal.add(matrix[i][i]);
            secondDiagonal.add(matrix[i][size - 1 - i]);
            for (let j = 0; j < size; j++) {
                row.add(matrix[i][j]);
                column.add(matrix[j][i]);
            }
            if (row.size === 1 || column.size === 1) {
                return true;
            }
        }
        return firstDiagonal.size === 1 || secondDiagonal.size === 1 ? true : false;
    }
    static isTie(availableMoves) {
        if (availableMoves.length === 0) {
            return true;
        }
        return false;
    }
}
exports.BoardUtils = BoardUtils;
//# sourceMappingURL=BoardUtils.js.map