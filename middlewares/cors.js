const allowedCors = [
  'https://moviesil.nomoredomains.work',
  'https://moviesil.nomoredomains.work/',
  'http://localhost:3001',
  'http://localhost:3001/',
  'http://localhost:3002',
  'http://localhost:3002/',
  'http://localhost:3003',
  'http://localhost:3003/',
  'http://localhost:3004',
  'http://localhost:3004/',
];

const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};