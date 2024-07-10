"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const utils_1 = require("../src/utils");
// Returns all the expected weekdays for a given month and year
(0, vitest_1.test)("getWeekdays", () => {
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(1, 2022)).toEqual([
        3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28,
        31,
    ]);
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(2, 2022)).toEqual([
        1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28,
    ]);
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(3, 2022)).toEqual([
        1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28, 29,
        30, 31,
    ]);
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(4, 2022)).toEqual([
        1, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 25, 26, 27, 28,
        29,
    ]);
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(5, 2022)).toEqual([
        2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27,
        30, 31,
    ]);
    (0, vitest_1.expect)((0, utils_1.getWeekdays)(6, 2022)).toEqual([
        1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28, 29,
        30,
    ]);
});
//# sourceMappingURL=utils.spec.js.map