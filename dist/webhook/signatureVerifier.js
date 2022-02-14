"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSipgateSignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvFdlnqRfO5TmqzjtsFVC
qPz+oW+poi3lXQFvMJJMEAtlU4MbX+yuIkgnC+Qt3AQWIK+oWSEQiybg+p39wEMl
16PZxEzf9gONQvTg1XhyHnwqYUFQj/AoxPKGYC3jmdjZ224SrESiTN3CdxoOc3vk
cXiQstYE7SxnksPtzfk0aIOkicim5/tAP9izNQ18/zmX3ChjK2k72gf5dDlq+qZ8
pRiHAPZ64TySH6cLQDhaoh6Nbq8FEG3usXXPClbUMh2DZaTMPafpd+LNuTngJ/y+
KoZasVuFfXAeBqGA6l5d4Uedfr99Z6qjwDrJ8sU4z2Do9bJrbuqP+mOXEebhSI1K
vi8trEfrIt8hnDBGsBaB9NEO3kYxvDT2/PhC9fNYFocjEpZNd7/mUqTJDYlpa4UC
NDQaU+ATdXG8/P5sGAegks6MQTu+qe9XTO0CV48eswDkz6g3UbLOwmrJK59SjD3J
yAZ52sluwyDKRWw/PPTt8BTQLjvkdbiLUlc4ehJ4b1X7D7diYWHDPeFL47cAvaXh
dXVrZDeBJYibvD1jRx4ES0KlfhwzNXBYUoM/Movg9zMM2PzyHHKS//xIjwUC/FJ6
/6eykno0Hy2B1ev6s3hdY6VkN2zd7Wf+EK4DxRliwsg1U99szFE3ewLfexF+Uag5
M+TfPtOUumI/NHMTvsRW9+ECAwEAAQ==
-----END PUBLIC KEY-----`;
exports.isSipgateSignature = (signature, body) => {
    const verifier = crypto_1.default.createVerify('RSA-SHA256');
    const signatureBuffer = Buffer.from(signature, 'base64');
    verifier.update(body);
    return verifier.verify(publicKey, signatureBuffer);
};
//# sourceMappingURL=signatureVerifier.js.map