import { TossWinnerAndIconsResponse, ListOfNumbers, Board, CellValueIndexMatching } from "../types/GameTypes";
export declare class GameUtils {
    static determineTossWinnerAndIcons(): TossWinnerAndIconsResponse;
    static getUserMoveInput(availableMoves: ListOfNumbers): number;
    static processMove(matrix: Board, availableMoves: ListOfNumbers, movesIndexMatchings: CellValueIndexMatching, userIcon: string, inputIcon: string): void;
    static runGameRound(matrix: Board, availableMoves: ListOfNumbers, movesIndexMatchings: CellValueIndexMatching, tossWonby: string, userIcon: string, compIcon: string): void;
    static runTicTacToeGame(): void;
}
