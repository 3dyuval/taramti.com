"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
var promises_1 = require("fs/promises");
var path = require("path");
var findById_1 = require("./findById");
function getData(args, id) {
    return __awaiter(this, void 0, void 0, function () {
        var fileName, fileLocation, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileName = args.fileName;
                    fileLocation = path.resolve(process.cwd(), 'api', 'data', fileName);
                    return [4 /*yield*/, promises_1.default
                            .stat(fileLocation)
                            .then(function (stat) {
                            if (stat.isFile()) {
                                console.log("\"".concat(fileName, "\" was found"));
                                return JSON.stringify(promises_1.default.readFile(fileLocation, 'utf8'));
                            }
                        })
                            .catch(function (e) {
                            console.log("File \"".concat(fileName, "\" not found. Fetching new file"));
                            return '';
                        })];
                case 1:
                    data = _a.sent();
                    if (!(data === '')) return [3 /*break*/, 3];
                    return [4 /*yield*/, args
                            .fetchFunction()
                            .then(function (result) {
                            if (typeof result === 'string') {
                                result = result ? JSON.parse(result) : [];
                            }
                            var dataWithUniqueIds = Array.from(result).map(function (i, index) { return (__assign(__assign({}, i), { id: index })); });
                            console.log("Received JSON data. Saving new file \"".concat(fileName, "\""));
                            promises_1.default.writeFile(fileLocation, JSON.stringify(dataWithUniqueIds), 'utf8');
                            return dataWithUniqueIds;
                        })
                            .catch(function (e) {
                            console.error('No data');
                        })];
                case 2:
                    data = _a.sent();
                    _a.label = 3;
                case 3:
                    if (id) {
                        return [2 /*return*/, (0, findById_1.findById)(data, id)];
                    }
                    return [2 /*return*/, data || Promise.reject('No data was fetched')];
            }
        });
    });
}
exports.getData = getData;
exports.default = {
    getData: getData,
};
