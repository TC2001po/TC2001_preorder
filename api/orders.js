import fs from 'fs';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'orders.json');

// 주문 데이터를 JSON 파일에 저장하는 함수
const saveOrderToFile = (orders) => {
  const currentOrders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf-8') || '[]');
  currentOrders.push(...orders);
  fs.writeFileSync(ordersFilePath, JSON.stringify(currentOrders, null, 2), 'utf-8');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orders, pickupTime } = req.body;

    try {
      saveOrderToFile(orders);
      res.status(200).json({ message: '주문이 성공적으로 처리되었습니다.' });
    } catch (error) {
      console.error('File write error:', error);
      res.status(500).json({ message: '주문 처리 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
