const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let orders = []; // 주문 목록

// 주문 받기 (POST)
app.use(express.json());

app.post('/api/orders', (req, res) => {
  const { orders: newOrders, pickupTime } = req.body;
  newOrders.forEach(order => {
    order.id = Date.now() + Math.random(); // 고유한 ID 부여
    order.pickupTime = pickupTime;
    order.completed = false; // 초기에는 미완료 상태
    orders.push(order);
  });
  res.json({ message: '주문이 저장되었습니다.' });
});

// 주문 목록 가져오기 (GET)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// 주문 완료 처리 (DELETE)
app.delete('/api/orders/:id', (req, res) => {
  const orderId = parseFloat(req.params.id);
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].completed = true; // 완료된 주문으로 표시
    res.json({ message: '주문이 완료되었습니다.' });
  } else {
    res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
