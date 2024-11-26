const jwt = require('jsonwebtoken');

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, 'b7bcb99b7f5b42133a0ed4d54969e859cce95d129944350f71c86e1a86a0cf96cebf508cee2b3d9cfbdcb86d356a8222010a72936d617b1f3da504399006667f49113c228a769f16a17c97793ff541c06ddf76220437ad374abdbda2aa05f0abfb94f81372e88f5800029ec9f91cf2eaae063b254c434a1c1c62c9f856d4078f27fc13947b1badc29619dafe711774cdffe7d952d8bf5e0d841ec97a4fe2e76eeb92e8a7c4c3085c8868c91962407e066be0cb5ab20d567e440a56dffda8a189c0907a2ea3387c26a94c4927c395ca1716d8a4a2345d150f3014e0e0558ef38bd9d0e743f326bbe067ec543ab3bcd00664d28c77c80bcba3c196442045bb4729');
      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).send('Access forbidden. Insufficient permissions.');
      }

      next();
    } catch (err) {
      res.status(400).send('Invalid token.');
    }
  };
};

module.exports = authMiddleware;
