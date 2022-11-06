const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let secretKey = 'pFqJB39xg5XeSt5jxdw9GDigmI3IpQRE';

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export default function handler(req, res) {
  let response = 'no';
  if (req.query.secret) {
    secretKey = req.query.secret;
  }

  if (req.query.text) {
    const result = decrypt(JSON.parse(req.query.text));
    response = result;
  }

  res.status(200).json({ password: response });
}
