const crypto = require('crypto');

function generateSecretKey() {
    return crypto.randomBytes(256).toString('hex');
}

console.log(generateSecretKey());