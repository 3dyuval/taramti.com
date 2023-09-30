"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddress = void 0;
function getAddress(row) {
    var address = [];
    [row === null || row === void 0 ? void 0 : row.City, row === null || row === void 0 ? void 0 : row.Street, row === null || row === void 0 ? void 0 : row.NumHouse].forEach(function (item) {
        if (item) {
            address.push(String(item));
        }
    });
    return address.join(', ');
}
exports.getAddress = getAddress;
