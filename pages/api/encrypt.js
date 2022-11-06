const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let secretKey = '';

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    let response = { password: 'no' };
    const body = JSON.parse(req.body);
    if (body.secret) {
      secretKey = body.secret;
    } else {
      secretKey = 'pFqJB39xg5XeSt5jxdw9GDigmI3IpQRE';
    }
    if (body.encryptText) {
      const test = encrypt(body.encryptText);
      response = test;
    }
    res.status(200).json(response);
  }
}
