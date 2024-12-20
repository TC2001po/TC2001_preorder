let orders = [];

// POST /api/orders: 주문 내역을 저장
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { orders: newOrders, pickupTime } = req.body;
    newOrders.forEach(order => {
      orders.push({ ...order, pickupTime });
    });
    res.status(200).json({ message: '주문이 저장되었습니다.' });
  } else if (req.method === 'GET') {
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
