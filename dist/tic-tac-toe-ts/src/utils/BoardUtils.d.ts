import { CreateBoardResponse, Board, CellValueIndexMatching, ListOfNumbers } from "../types/GameTypes";
export declare class BoardUtils {
    static isValidBoardSize(size: number): boolean;
    static getValidBoardSize(): number;
    static createBoard(size: number): CreateBoardResponse;
    static printBoard(board: Board): void;
    static updateAvailableMoves(availableMoves: ListOfNumbers, move: number): void;
    static updateMoveInBoard(matrix: Board, move: number, moveMadeByIcon: string, availableMoves: ListOfNumbers, movesIndexMatchings: CellValueIndexMatching): void;
    static isWinningMove(matrix: Board): boolean;
    static isTie(availableMoves: ListOfNumbers): boolean;
}
