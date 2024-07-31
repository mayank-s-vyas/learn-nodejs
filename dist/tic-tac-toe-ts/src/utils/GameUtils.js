"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameUtils = void 0;
const readlineSync = require("readline-sync");
const BoardUtils_1 = require("./BoardUtils");
const RandomGeneratorUtils_1 = require("./RandomGeneratorUtils");
const constants_1 = require("./constants");
class GameUtils {
    static determineTossWinnerAndIcons() {
        console.log("We are tossing the coin to decide who will start the game");
        let tossWinner;
        let input;
        let userIcon = constants_1.USER_DEFAULT_ICON;
        let compIcon = constants_1.COMP_DEFAULT_ICON;
        tossWinner = Math.random() > 0.5 ? constants_1.USER : constants_1.COMPUTER;
        if (tossWinner === constants_1.USER) {
            input = readlineSync.question(`${tossWinner} won the toss, now please select the icon you want to play with : Enter O or X else we'll choose ${constants_1.USER_DEFAULT_ICON} for you : `);
            userIcon =
                input.toUpperCase() === "O" ||
                    input.toUpperCase() === "0" ||
                    input.toUpperCase() === "X"
                    ? input.toUpperCase()
                    : constants_1.USER_DEFAULT_ICON;
            console.log(`You have Chosen to play with : ${userIcon}`);
            compIcon =
                userIcon === constants_1.USER_DEFAULT_ICON ? constants_1.COMP_DEFAULT_ICON : constants_1.USER_DEFAULT_ICON;
        }
        else {
            console.log(`${tossWinner} won the toss and has chosen to play with ${compIcon}`);
        }
        return { tossWinner, userIcon, compIcon };
    }
    static getUserMoveInput(availableMoves) {
        let num;
        do {
            const userInput = readlineSync.question(`Please choose a move exclusively from the available options: ${availableMoves}:  `);
            num = parseInt(userInput);
        } while (isNaN(num) || !availableMoves.includes(num));
        return num;
    }
    static processMove(matrix, availableMoves, movesIndexMatchings, userIcon, inputIcon) {
        if (BoardUtils_1.BoardUtils.isWinningMove(matrix) || BoardUtils_1.BoardUtils.isTie(availableMoves)) {
            return;
        }
        const move = inputIcon === userIcon
            ? GameUtils.getUserMoveInput(availableMoves)
            : RandomGeneratorUtils_1.RandomGeneratorUtils.generateRandomComputerMove(availableMoves);
        BoardUtils_1.BoardUtils.updateMoveInBoard(matrix, move, inputIcon, availableMoves, movesIndexMatchings);
        const winner = inputIcon === userIcon ? constants_1.USER : constants_1.COMPUTER;
        if (BoardUtils_1.BoardUtils.isWinningMove(matrix)) {
            console.log(`${winner} won.`);
            return;
        }
        if (BoardUtils_1.BoardUtils.isTie(availableMoves)) {
            console.log("This is tie");
            return;
        }
    }
    static runGameRound(matrix, availableMoves, movesIndexMatchings, tossWonby, userIcon, compIcon) {
        const player1 = tossWonby === constants_1.USER ? userIcon : compIcon;
        const player2 = tossWonby === constants_1.USER ? compIcon : userIcon;
        GameUtils.processMove(matrix, availableMoves, movesIndexMatchings, userIcon, player1);
        GameUtils.processMove(matrix, availableMoves, movesIndexMatchings, userIcon, player2);
    }
    static runTicTacToeGame() {
        const matrixSizeUserInput = BoardUtils_1.BoardUtils.getValidBoardSize();
        const { matrix, valueIndicesMatch, availableCellIndices: availableMoves, } = BoardUtils_1.BoardUtils.createBoard(matrixSizeUserInput);
        BoardUtils_1.BoardUtils.printBoard(matrix);
        const { tossWinner, userIcon, compIcon } = GameUtils.determineTossWinnerAndIcons();
        while (!BoardUtils_1.BoardUtils.isWinningMove(matrix) &&
            !BoardUtils_1.BoardUtils.isTie(availableMoves)) {
            GameUtils.runGameRound(matrix, availableMoves, valueIndicesMatch, tossWinner, userIcon, compIcon);
        }
    }
}
exports.GameUtils = GameUtils;
//# sourceMappingURL=GameUtils.js.map