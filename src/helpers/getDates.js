"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDates = void 0;
var fp_1 = require("date-fns/fp");
var function_1 = require("fp-ts/function");
var O = require("fp-ts/Option");
function getDates(row) {
    var parseHoursAndMinutes = function (time) {
        return (0, function_1.pipe)(time, O.fromNullable, O.map(function (time) { return time.split(':').map(Number); }), O.map(getDate));
    };
    var getDate = function (maybeHoursAndMinutes) {
        var hours = maybeHoursAndMinutes[0], minutes = maybeHoursAndMinutes[1];
        return (0, function_1.pipe)(new Date(), (0, fp_1.setHours)(hours), (0, fp_1.setMinutes)(minutes), (0, fp_1.setSeconds)(0));
    };
    return (0, function_1.pipe)([row === null || row === void 0 ? void 0 : row.FromHour, row === null || row === void 0 ? void 0 : row.ToHour], function (times) { return times.map(parseHoursAndMinutes); }, O.sequenceArray, O.getOrElse(function () { return []; }));
}
exports.getDates = getDates;
