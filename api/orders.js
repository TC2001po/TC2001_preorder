import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabase = createClient('https://rcxnigdyufxbrvockynp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeG5pZ2R5dWZ4YnJ2b2NreW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjM5MzUsImV4cCI6MjA1MDI5OTkzNX0.MMYdhlUjr6OcG5CeOKqpjNm8S2hqNMmTvFOEzKhUo5Q');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orders, pickupTime } = req.body;

    try {
      // Supabase에 주문 내역 저장
      const { data, error } = await supabase
        .from('orders')
        .insert(orders.map(order => ({
          ...order,
          pickupTime
        })));

      if (error) {
        throw error;
      }

      res.status(200).json({ message: '주문이 성공적으로 저장되었습니다.' });
    } catch (error) {
      console.error('주문 저장 중 오류 발생:', error);
      res.status(500).json({ message: '주문 저장 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
