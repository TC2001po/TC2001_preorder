// api/orders.js
let orders = [];

export default function handler(req, res) {
    if (req.method === 'POST') {
        // POST 요청은 새로운 주문을 추가
        const { name, menu, quantity, pickupTime } = req.body;
        const newOrder = { name, menu, quantity, pickupTime };
        orders.push(newOrder);
        res.status(200).json({ message: '주문이 성공적으로 저장되었습니다.' });
    } else if (req.method === 'GET') {
        // GET 요청은 주문 목록을 반환
        res.status(200).json(orders);
    } else {
        // 지원되지 않는 HTTP 메서드
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
