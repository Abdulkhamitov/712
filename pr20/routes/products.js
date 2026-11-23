const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics', inStock: true },
  { id: 2, name: 'Смартфон', price: 30000, category: 'electronics', inStock: true },
  { id: 3, name: 'Книга', price: 500, category: 'books', inStock: false },
  { id: 4, name: 'Наушники', price: 4000, category: 'electronics', inStock: true }
];

// Middleware для проверки ID товара
router.param('id', (req, res, next, id) => {
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Неверный формат ID' });
  }
  req.productId = productId;
  next();
});

// GET /api/products
router.get('/', (req, res) => {
  const { category, inStock, minPrice, maxPrice } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (inStock !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.inStock === (inStock === 'true'));
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice, 10));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice, 10));
  }

  res.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.productId);

  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  res.json({ data: product });
});

// POST /api/products
router.post('/', (req, res) => {
  const { name, price, category, inStock = true } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      error: 'Поля name, price и category обязательны'
    });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    price: parseInt(price, 10),
    category,
    inStock: Boolean(inStock),
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);

  res.status(201).json({
    message: 'Товар создан',
    data: newProduct
  });
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const { name, price, category, inStock } = req.body;

  if (name) products[index].name = name;
  if (price !== undefined) products[index].price = parseInt(price, 10);
  if (category) products[index].category = category;
  if (inStock !== undefined) products[index].inStock = Boolean(inStock);
  products[index].updatedAt = new Date().toISOString();

  res.json({
    message: 'Товар обновлен',
    data: products[index]
  });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const deleted = products.splice(index, 1)[0];

  res.json({
    message: 'Товар удален',
    data: deleted
  });
});

module.exports = router;
