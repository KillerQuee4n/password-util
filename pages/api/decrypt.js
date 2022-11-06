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
  if (req.method === 'POST') {
    let response = 'no';
    const body = JSON.parse(req.body);
    if (body.secret) {
      secretKey = body.secret;
    } else {
      secretKey = 'pFqJB39xg5XeSt5jxdw9GDigmI3IpQRE';
    }

    if (body.decryptText) {
      const result = decrypt(JSON.parse(body.decryptText));
      response = result;
    }
    res.status(200).json({ password: response });
  }
}
