"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.onPrClosed = void 0;
var github = __importStar(require("@actions/github"));
var core = __importStar(require("@actions/core"));
var labelling_1 = require("../utills/labelling");
/**
 * Removes the 'lgtm' label after a pull request event
 *
 * @param context - The github actions event context
 */
var onPrClosed = function (context) {
    if (context === void 0) { context = github.context; }
    return __awaiter(void 0, void 0, void 0, function () {
        var token, octokit, prNumber, prTitle, prBody, issueNumber, response, linkedPRCount;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    token = core.getInput('github-token', { required: false });
                    octokit = new github.GitHub(token);
                    prNumber = (_a = context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
                    prTitle = (_b = context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.title;
                    prBody = (_c = context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.body;
                    console.log(prBody, "###################################################### pr body and title", prTitle);
                    if (prNumber === undefined) {
                        throw new Error("github context payload missing pr number: ".concat(context.payload));
                    }
                    issueNumber = (0, labelling_1.getIssueNummber)(prBody, prTitle);
                    return [4 /*yield*/, octokit.pulls.list({
                            owner: 'prakrit55',
                            repo: 'githubactions',
                            state: 'open',
                        })];
                case 1:
                    response = _d.sent();
                    linkedPRCount = 0;
                    response.data.forEach(function (pullRequest) {
                        if (pullRequest.body.includes("#".concat(issueNumber))) {
                            linkedPRCount++;
                        }
                    });
                    console.log(response.data, "#############################", linkedPRCount);
                    if (linkedPRCount > 0) {
                        return [2 /*return*/];
                    }
                    console.log(issueNumber, "#####################################################   issuenumber");
                    return [4 /*yield*/, (0, labelling_1.removeLabel)(octokit, context, issueNumber, "review")];
                case 2:
                    _d.sent();
                    return [2 /*return*/, issueNumber
                        //   let currentLabels: string[] = []
                        //   try {
                        //     currentLabels = await getCurrentLabels(octokit, context, issueNumber)
                        //     core.debug(`remove-lgtm: found labels for issue ${currentLabels}`)
                        //   } catch (e) {
                        //     throw new Error(`could not get labels from issue: ${e}`)
                        //   }
                        //   if (!currentLabels.includes('review')) {
                        //     return
                        //   }
                        //   const labelIsPresent = await labelPresent(octokit, context, 'in-review')
                        //   console.log(labelIsPresent, "#########################################               onPrLabel")
                        //   if (labelIsPresent != "review") {
                        //     return
                        //   } else {
                        //     await removeLabel (octokit, context, issueNumber, "review")
                        //   }
                    ];
            }
        });
    });
};
exports.onPrClosed = onPrClosed;
