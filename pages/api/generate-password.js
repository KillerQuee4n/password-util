const generator = require('generate-password');

export default function handler(req, res) {
  let length = 20;
  if (req.query.length) {
    length = req.query.length;
  }

  console.log(req.query.length, req.query.number, req.query.symbol);

  const password = generator.generate({
    length: length,
    numbers: req.query.number === 'false' ? false : true,
    symbols: req.query.symbol === 'false' ? false : true,
  });
  res.status(200).json({ password });
}
