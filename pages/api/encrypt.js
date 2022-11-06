const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let secretKey = 'pFqJB39xg5XeSt5jxdw9GDigmI3IpQRE';

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
  let response = { password: 'no' };
  if (req.query.secret) {
    secretKey = req.query.secret;
  }

  if (req.query.text) {
    const test = encrypt(req.query.text);
    response = test;
  }

  res.status(200).json(response);
}
