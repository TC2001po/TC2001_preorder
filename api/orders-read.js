import fs from 'fs';
import path from 'path';

const ordersFilePath = path.join(process.cwd(), 'orders.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(ordersFilePath, 'utf-8');
      
      // 파일 읽기 성공 후 데이터 확인
      console.log('파일에서 읽은 데이터:', data);

      const orders = JSON.parse(data || '[]');
      
      // 주문 내역이 잘 반환되는지 확인하기 위한 로그 추가
      console.log('파싱된 주문 내역:', orders);
      
      res.status(200).json({ orders });
    } catch (error) {
      // 파일 읽기 또는 JSON 파싱 오류가 발생할 경우
      console.error('파일 읽기 또는 JSON 파싱 오류:', error);
      res.status(500).json({ message: '주문 내역을 불러오는 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
