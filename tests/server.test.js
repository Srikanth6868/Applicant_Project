"use strict";
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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server"); // Assuming your Express app instance is exported from server.ts
describe('CRUD Operations', () => {
    const newApplicant = {
        id: 1,
        name: 'Srikanth',
        email: 'srikanth@example.com',
    };
    it('should create a new applicant', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post('/awesome/applicant')
            .send(newApplicant);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(newApplicant));
    }));
    it('should retrieve applicant info', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).get('/awesome/applicant/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(newApplicant));
    }));
    it('should update applicant info', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedInfo = {
            name: 'Updated Name',
            email: 'updated@example.com',
        };
        const response = yield (0, supertest_1.default)(server_1.app)
            .put('/awesome/applicant/1')
            .send(updatedInfo);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(updatedInfo));
    }));
    it('should delete an applicant', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).delete('/awesome/applicant/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Applicant deleted successfully' });
    }));
});
