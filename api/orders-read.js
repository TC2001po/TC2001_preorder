import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabase = createClient('https://rcxnigdyufxbrvockynp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeG5pZ2R5dWZ4YnJ2b2NreW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MjM5MzUsImV4cCI6MjA1MDI5OTkzNX0.MMYdhlUjr6OcG5CeOKqpjNm8S2hqNMmTvFOEzKhUo5Q');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Supabase에서 모든 주문 내역 가져오기
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('id', { ascending: false }); // 최신 주문 순으로 정렬

      if (error) {
        throw error;
      }

      res.status(200).json({ orders: data });
    } catch (error) {
      console.error('주문 내역을 불러오는 중 오류 발생:', error);
      res.status(500).json({ message: '주문 내역을 불러오는 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
