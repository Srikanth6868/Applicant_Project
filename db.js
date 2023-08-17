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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplicant = exports.updateApplicant = exports.createApplicant = exports.getApplicantInfo = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ApplicantDB',
    password: '1234',
    port: 5432, // Default PostgreSQL port
});
const getApplicantInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM applicants WHERE id = $1';
    const values = [id];
    const result = yield pool.query(query, values);
    return result.rows[0];
});
exports.getApplicantInfo = getApplicantInfo;
const createApplicant = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO applicants (id, name, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [id, name, email];
    const result = yield pool.query(query, values);
    return result.rows[0];
});
exports.createApplicant = createApplicant;
const updateApplicant = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE applicants SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [name, email, id];
    const result = yield pool.query(query, values);
    return result.rows[0];
});
exports.updateApplicant = updateApplicant;
const deleteApplicant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'DELETE FROM applicants WHERE id = $1';
    const values = [id];
    yield pool.query(query, values);
});
exports.deleteApplicant = deleteApplicant;
