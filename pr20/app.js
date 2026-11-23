const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Импорт роутеров и middleware
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const rateLimiter = require('./middleware/rateLimiter');

// ---------- Глобальные middleware ----------

// Парсинг JSON
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Базовые заголовки безопасности
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Rate limiting
app.use(rateLimiter);

// ---------- Базовые маршруты ----------

app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в Express.js приложение!',
    endpoints: {
      '/api/users': 'Работа с пользователями',
      '/api/products': 'Работа с товарами',
      '/api/status': 'Статус сервера'
    }
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Health-check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// ---------- Подключение роутеров ----------

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// ---------- Обработка 404 ----------

app.use((req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/status',
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'PUT /api/users/:id',
      'DELETE /api/users/:id',
      'GET /api/products',
      'GET /api/products/:id',
      'POST /api/products',
      'PUT /api/products/:id',
      'DELETE /api/products/:id'
    ]
  });
});

// ---------- Централизованная обработка ошибок ----------

app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);

  // Ошибка валидации (например, MongoDB)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Ошибка валидации',
      details: err.errors
    });
  }

  // Дублирование ключа (MongoDB E11000)
  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Конфликт данных',
      message: 'Запись с такими данными уже существует'
    });
  }

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
  });
});

// ---------- Запуск ----------

app.listen(PORT, () => {
  console.log(`Express сервер запущен на порту ${PORT}`);
  console.log(`Доступен по адресу: http://localhost:${PORT}`);
  console.log('Доступные маршруты:');
  [
    'GET /',
    'GET /health',
    'GET /api/status',
    'GET /api/users',
    'GET /api/users/:id',
    'POST /api/users',
    'PUT /api/users/:id',
    'DELETE /api/users/:id',
    'GET /api/products',
    'GET /api/products/:id',
    'POST /api/products',
    'PUT /api/products/:id',
    'DELETE /api/products/:id'
  ].forEach(r => console.log('  ' + r));
});
