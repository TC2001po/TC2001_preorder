const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let orders = [];  // 주문을 저장할 배열

// POST /api/orders - 주문을 서버에 저장
app.post('/api/orders', (req, res) => {
  const { orders: orderDetails, pickupTime, customerName, customerAffiliation } = req.body;
  const order = {
    orders: orderDetails,
    pickupTime,
    customerName,
    customerAffiliation,
    orderTime: new Date().toLocaleString()  // 주문 시간이 포함된 정보
  };
  orders.push(order);  // 주문 정보 저장
  res.json({ message: '주문이 완료되었습니다!', order });
});

// GET /api/orders - 주문 내역을 가져오는 API
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
