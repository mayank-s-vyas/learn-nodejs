"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomGeneratorUtils = void 0;
class RandomGeneratorUtils {
    static generateRandomComputerMove(availableMoves) {
        const index = Math.floor(Math.random() * availableMoves.length);
        console.log(`Computer selected :  ${availableMoves[index]}`);
        return availableMoves[index];
    }
}
exports.RandomGeneratorUtils = RandomGeneratorUtils;
//# sourceMappingURL=RandomGeneratorUtils.js.map