const generator = require('generate-password');

export default function handler(req, res) {
  if (req.query) {
    try {
      let { length, lowercase, uppercase, number, symbol } = req.query;
      length = parseInt(length);
      lowercase = lowercase === 'true' ? true : false;
      uppercase = uppercase === 'true' ? true : false;
      number = number === 'true' ? true : false;
      symbol = symbol === 'true' ? true : false;

      const password = generator.generate({
        length: length,
        numbers: number,
        symbols: symbol,
        uppercase: uppercase,
        lowercase: lowercase,
      });

      res.status(200).json({ string: password });
    } catch (e) {
      console.log(e);
    }
  }
}
