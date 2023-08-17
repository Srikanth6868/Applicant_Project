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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db = __importStar(require("./db")); // database interaction module
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
app.use(body_parser_1.default.json());
//  Get applicant
app.get('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const applicantInfo = yield db.getApplicantInfo(Number(id));
        res.json(applicantInfo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// POST create applicant
app.post('/awesome/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email } = req.body;
        const createdApplicant = yield db.createApplicant(id, name, email);
        res.json(createdApplicant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create applicant' });
    }
}));
// PUT update applicant
app.put('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedApplicant = yield db.updateApplicant(Number(id), name, email);
        res.json(updatedApplicant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update applicant' });
    }
}));
// DELETE applicant
app.delete('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db.deleteApplicant(Number(id));
        res.json({ message: 'Applicant deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete applicant' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
