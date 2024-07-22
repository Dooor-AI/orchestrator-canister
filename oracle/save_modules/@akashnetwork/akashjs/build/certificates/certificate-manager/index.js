"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateManager = exports.CertificateManager = void 0;
const CertificateManager_1 = require("./CertificateManager");
Object.defineProperty(exports, "CertificateManager", { enumerable: true, get: function () { return CertificateManager_1.CertificateManager; } });
const certificateManager = new CertificateManager_1.CertificateManager();
exports.certificateManager = certificateManager;
