# Примеры curl-запросов для проверки API

BASE="http://localhost:3000"

echo "=== Базовый маршрут ==="
curl -s $BASE/

echo -e "\n=== Статус ==="
curl -s $BASE/api/status

echo -e "\n=== Health ==="
curl -s $BASE/health

echo -e "\n=== Все пользователи ==="
curl -s $BASE/api/users

echo -e "\n=== Пользователи с ролью admin ==="
curl -s "$BASE/api/users?role=admin"

echo -e "\n=== Создать пользователя ==="
curl -s -X POST $BASE/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Алексей Смирнов","email":"alexey@example.com","role":"user"}'

echo -e "\n=== Обновить пользователя #1 ==="
curl -s -X PUT $BASE/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Иван Петров"}'

echo -e "\n=== Удалить пользователя #2 ==="
curl -s -X DELETE $BASE/api/users/2

echo -e "\n=== Все товары ==="
curl -s $BASE/api/products

echo -e "\n=== Товары electronics в наличии ==="
curl -s "$BASE/api/products?category=electronics&inStock=true"

echo -e "\n=== Создать товар ==="
curl -s -X POST $BASE/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Клавиатура","price":3500,"category":"electronics"}'

echo -e "\n=== Несуществующий маршрут ==="
curl -s $BASE/api/unknown

echo
