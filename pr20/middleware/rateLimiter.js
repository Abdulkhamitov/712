const requestCounts = {};

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 минут
  const maxRequests = 100;

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: now };
  } else {
    if (now - requestCounts[ip].startTime > windowMs) {
      requestCounts[ip] = { count: 1, startTime: now };
    } else {
      requestCounts[ip].count++;
    }
  }

  if (requestCounts[ip].count > maxRequests) {
    return res.status(429).json({
      error: 'Слишком много запросов',
      message: 'Пожалуйста, попробуйте позже'
    });
  }

  next();
}

module.exports = rateLimiter;
